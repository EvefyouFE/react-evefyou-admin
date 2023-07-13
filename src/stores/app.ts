import { DEFAULT_PROJECT_CONFIG, DEFAULT_ROUTER_CONFIG } from "@/config";
import { BaseSetting, KeepAliveSetting, LayoutSetting, MenuSetting, TabContainerSetting, ProjectConfig, RouterConfig } from "@/types/config";
import { deepMerge } from "@/utils";
import { atom, selector } from "recoil";

interface AppState {
    // project config
    projectConfig: ProjectConfig;
    routerConfig: RouterConfig;
}

export const DEFAULT_APP_STATE: AppState = {
    projectConfig: DEFAULT_PROJECT_CONFIG,
    routerConfig: DEFAULT_ROUTER_CONFIG,
}

export const appAtom = atom<AppState>({
    key: 'appAtom',
    default: {} as AppState
});

export const baseSettingSelector = selector<Partial<BaseSetting>>({
    key: 'baseSettingSelector',
    get: ({ get }) => get(appAtom).projectConfig.baseSetting,
    set: ({ get, set }, newValue) => {
        const appState = get(appAtom);
        set(appAtom, {
            ...appState, projectConfig: {
                ...appState.projectConfig,
                baseSetting: deepMerge(appState.projectConfig.baseSetting, newValue)
            }
        })
    }
});

export const layoutSettingSelector = selector<Partial<LayoutSetting>>({
    key: 'layoutSettingSelector',
    get: ({ get }) => get(appAtom).projectConfig.layoutSetting,
    set: ({ get, set }, newValue) => {
        const appState = get(appAtom);
        set(appAtom, {
            ...appState, projectConfig: {
                ...appState.projectConfig,
                layoutSetting: deepMerge(appState.projectConfig.layoutSetting, newValue)
            }
        })
    }
});

export const menuSettingSelector = selector<Partial<MenuSetting>>({
    key: 'menuSettingSelector',
    get: ({ get }) => get(appAtom).projectConfig.menuSetting,
    set: ({ get, set }, newValue) => {
        const appState = get(appAtom);
        set(appAtom, {
            ...appState, projectConfig: {
                ...appState.projectConfig,
                menuSetting: deepMerge(appState.projectConfig.menuSetting, newValue)
            }
        })
    }
});

export const keepAliveSettingSelector = selector<Partial<KeepAliveSetting>>({
    key: 'keepAliveSettingSelector',
    get: ({ get }) => get(appAtom).routerConfig.keepAliveSetting,
    set: ({ get, set }, newValue) => {
        const appState = get(appAtom);
        set(appAtom, { ...appState, routerConfig: { keepAliveSetting: deepMerge(appState.routerConfig.keepAliveSetting, newValue) } })
    }
});

export const tabContainerSettingSelector = selector<Partial<TabContainerSetting>>({
    key: 'tabContainerSettingSelector',
    get: ({ get }) => get(appAtom).projectConfig.tabContainerSetting,
    set: ({ get, set }, newValue) => {
        const appState = get(appAtom);
        set(appAtom, {
            ...appState, projectConfig: {
                ...appState.projectConfig,
                tabContainerSetting: deepMerge(appState.projectConfig.tabContainerSetting, newValue)
            }
        })
    }
});

export default appAtom;