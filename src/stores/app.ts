import { DEFAULT_PROJECT_CONFIG, DEFAULT_ROUTER_CONFIG } from "@/config";
import { defineRecoilSelectorState } from "@/utils";
import { atom } from "recoil";

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
    default: DEFAULT_APP_STATE
});

export const useAppRecoilState = defineRecoilSelectorState({
    name: 'appState',
    state: DEFAULT_APP_STATE as AppState,
    getters: {
        getBaseSetting(state) {
            return state.projectConfig.baseSetting
        },
        getLayoutSetting(state) {
            return state.projectConfig.layoutSetting
        },
        getMenuSetting(state) {
            return state.projectConfig.menuSetting
        },
        getKeepAliveSetting(state) {
            return state.routerConfig.keepAliveSetting
        },
        getTabContainerSetting(state) {
            return state.projectConfig.tabContainerSetting
        },
    },
    setters: {
        setBaseSetting(baseSetting: BaseSetting) {
            this.deepMerge(['projectConfig', 'baseSetting'] as const, baseSetting)
        },
        setLayoutSetting(layoutSetting: Partial<LayoutSetting>) {
            this.deepMerge(['projectConfig', 'layoutSetting'] as const, layoutSetting)
        },
        setMenuSetting(menuSetting: Partial<MenuSetting>) {
            this.deepMerge(['projectConfig', 'menuSetting'] as const, menuSetting)
        },
        setKeepAliveSetting(keepAliveSetting: KeepAliveSetting) {
            this.deepMerge(['routerConfig', 'keepAliveSetting'] as const, keepAliveSetting)
        },
        setTabContainerSetting(tabContainerSetting: TabContainerSetting) {
            this.deepMerge(['projectConfig', 'tabContainerSetting'] as const, tabContainerSetting)
        },
    },
    actions: {
        toggleCollapsed() {
            const menuSetting = this.getMenuSetting()
            this.setMenuSetting({
                collapsed: !menuSetting.collapsed, 
                showMenu: !menuSetting.showCollapsed ? menuSetting.collapsed : true 
            })
        }
    }
}, appAtom)