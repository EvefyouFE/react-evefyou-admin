import { mutationLogin, queryGetCurrentUser, queryLogout } from "@/api";
import { DEFAULT_USER_INFO } from "@/config/user";
import { PageEnum } from "@/enums";
import { useMessage } from "@/hooks/web";
import { defineRecoilSelectorState } from "@/hooks/state";
// import { setAuthCache } from "@/utils/auth";
import { Locale, LoginByUsernameReq, UserInfo } from "@models/auth";
import { MenuTreeList } from "@models/auth/memu";
import { useAuthRecoilState } from "./auth";
import { appAtom } from "./app";
import { atom } from "recoil";
import { router } from "@/routes";
import React from "react";
import { formatById } from "@/locales";

export interface UserState {
    userInfo: Nullable<UserInfo>;
    token: string;
    isSessionTimeout: boolean;
    lastUpdateTime: number;
}

export const DEFAULT_USER_STATE: UserState = {
    token: 'guest',
    userInfo: DEFAULT_USER_INFO,
    isSessionTimeout: false,
    lastUpdateTime: new Date().getTime()
}

export const userAtom = atom<UserState>({
    key: 'userAtom',
    default: DEFAULT_USER_STATE
});

export const useUserRecoilState = defineRecoilSelectorState({
    name: 'userState',
    state: DEFAULT_USER_STATE,
    getters: {
        getMenuList(state) {
            return state.userInfo?.menuList
        },
        getDefaultLocale(state) {
            const appState = this.getState(appAtom)
            const locale = appState?.projectConfig?.baseSetting?.locale as Locale
            return state.userInfo?.locale ?? locale
        },
        getUser(state) {
            return state.userInfo
        },
        getToken(state) {
            return state.token
        },
    },
    setters: {
        setMenuList(menuList: MenuTreeList) {
            this.deepSet(['userInfo', 'menuList'] as const, menuList)
        },
        setLocale(locale: Locale) {
            this.deepSet(['userInfo', 'locale'] as const, locale)
        },
        setToken(token?: string) {
            this.setProps({ token })
        },
        setIsSessionTimeout(isSessionTimeout: boolean) {
            this.setProps({ isSessionTimeout })
        },
        setUserInfo(userInfo: Nullable<UserInfo>) {
            this.setProps({ userInfo, lastUpdateTime: new Date().getTime() })
            this.setProps({ userInfo })
            // setAuthCache(USER_INFO_KEY, userInfo);
        },
    },
    callback: () => {
        const loginMutation = mutationLogin.useMutation()
        const [, permissionMethods] = useAuthRecoilState()
        return {
            loginMutation,
            ...permissionMethods,
        }
    },
    actions: {
        async login(
            params: LoginByUsernameReq,
            options?: {
                goHome?: boolean;
                mode?: ErrorMessageMode;
            },
        ): Promise<Nullable<UserInfo>> {
            try {
                const { goHome = true } = options ?? {};
                const { token } = await this.loginMutation.mutateAsync(params);
                this.setToken(token);
                return this.afterLoginAction(goHome);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async afterLoginAction(goHome?: boolean, state?: Partial<UserState>): Promise<Nullable<UserInfo>> {
            const { token } = state ?? this.userState
            if (!token) return null;
            const userInfo = await this.getUserInfoAction({ token });
            const sessionTimeout = this.userState.isSessionTimeout;
            if (sessionTimeout) {
                this.setIsSessionTimeout(false);
            } else {
                await this.refreshAuthAction();
                goHome && router.navigate(userInfo?.homePath || PageEnum.BASE_HOME);
            }
            return userInfo;
        },
        async getUserInfoAction(state?: Partial<UserState>): Promise<Nullable<UserInfo>> {
            const { token } = state ?? this.userState
            if (!token) return null;
            const userInfo = await queryGetCurrentUser.fetchQuery()
            this.setRoleList(userInfo?.roleList ?? []);
            this.setPermissionList(userInfo?.permissionList ?? [])
            this.setUserInfo(userInfo ?? null);
            return userInfo;
        },
        async logout(goLogin = false) {
            if (this.userState.token) {
                try {
                    await queryLogout.fetchQuery();
                } catch {
                    console.log('注销Token失败');
                }
            }
            this.setToken(undefined);
            this.setIsSessionTimeout(false);
            this.setUserInfo(null);
            goLogin && router.navigate(PageEnum.BASE_LOGIN);
        },
        confirmLoginOut() {
          const { createConfirm } = useMessage();
          createConfirm({
            iconType: 'warning',
            title: React.createElement('span', {}, [formatById('sys.app.logout.tip')]),
            content: React.createElement('span',{}, formatById('sys.app.logout.msg')),
            onOk: async () => {
              await this.logout(true);
            },
          });
        },
    },
}, userAtom)