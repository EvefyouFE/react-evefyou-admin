
import { defineRecoilState } from "@/hooks/state";
import { queryGetCurrentMenuList } from "@/api";
import { MenuItem, MenuTreeList, Role } from "@/models";
import { atom } from "recoil";
import { localStorageEffect } from "./effects";
import { converListToTree } from "@/utils/list";

interface PermissionState {
    // Permission code list
    // 权限代码列表
    permissionList: string[] | number[];
    roleList: Role[];
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: number;
    // Backstage menu list
    // 后台菜单列表
    menuTreeList: MenuTreeList;
    // 路由
    routes: string[];
}

const DEFAULT_AUTH_STATE: PermissionState = {
    // 权限代码列表
    permissionList: [],
    roleList: ['guest'],
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // Backstage menu list
    // 后台菜单列表
    menuTreeList: [],
    routes: []
}

export const authAtom = atom({
    key: 'authAtom',
    default: DEFAULT_AUTH_STATE,
    effects: [localStorageEffect('YXV0aA==')],
})

export const useAuthRecoilState = defineRecoilState({
    name: 'authState',
    defaultValue: DEFAULT_AUTH_STATE,
    state: authAtom,
    getters: {
        getPermissionList(state) {
            return state.permissionList;
        },
        getRoleList(state) {
            return state.roleList;
        },
        getMenuTreeList(state) {
            return state.menuTreeList;
        },
        getLastBuildMenuTime(state) {
            return state.lastBuildMenuTime;
        },
        getRoutes(state) {
            return state.routes;
        },
    },
    setters: {
        setPermissionList(permissionList: string[]|number[]) {
            this.setProps({ permissionList });
        },
        setRoleList(roleList: Role[]) {
            this.setProps({ roleList });
        },
        setMenuTreeList(menuTreeList: MenuTreeList) {
            this.setProps({ menuTreeList });
            menuTreeList?.length > 0 && this.setLastBuildMenuTime();
        },
        setLastBuildMenuTime() {
            this.setProps({ lastBuildMenuTime: new Date().getTime() });
        },
        setRoutes(routes: string[]) {
            this.setProps({ routes });
        },
    },
    actions: {
        async refreshAuthAction(): Promise<string[]> {
            const menuList = await queryGetCurrentMenuList.fetchQuery()
            if (!menuList) {
                this.setMenuTreeList([])
                this.setRoutes([])
                return []
            }
            const routes = menuList.map(m =>m.path)
            this.setRoutes(routes)
            const menuTreeList = converListToTree<MenuItem>(menuList, 0)
            this.setMenuTreeList(menuTreeList)
            return routes
        },
    }
});

