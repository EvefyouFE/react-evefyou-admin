
export interface IconMapSetting {
  [key: string]: string;
}

export interface TabsMenuItem {
  title: string,
  icon: string,
}

export interface BaseSetting {
  theme: Partial<import('antd').AliasToken>;
  prefixCls: string;
  isMobile: boolean;
  locale: string;
}

export interface ComponentTableFetchSetting {
  pageField: string;
  sizeField: string;
  listField: string;
  totalField: string;
}

export interface ComponentTableSetting {
  fetchSetting: ComponentTableFetchSetting;
  pageSizeOptions: `${number}`[];
  pageSize: number;
  size: string;
  sortFn: import('./component').SortFn;
  filterFn: import('./component').FilterFn;
}

export interface ComponentSetting {
  table: ComponentTableSetting;
}

export interface LayoutSetting {
  fontSize: number;
  unit: string;
  siderWidth: number;
  headerHeight: number;
  pageTabsNavHeight: number;
  pageContainerPadding: number;
  footerHeight: number;
}

export interface MenuSetting {
  showCollapsed: boolean;
  showMenu: boolean;
  collapsed: boolean;
  menuIconMap: IconMapSetting;
  isRoutesMenu:boolean;
  exposeMenuList: string[];
}

export interface TabContainerSetting {
  tabsMenuList: TabsMenuItem[];
  indexRedirectPath: string;
}

export interface KeepAliveSetting {
  includes?: string[];
  excludes?: string[];
  includeAll?: boolean;
  active?: boolean;
  maxLen?: number;
}


export interface ProjectConfig {
  layoutSetting: LayoutSetting;
  baseSetting: BaseSetting;
  menuSetting: MenuSetting;
  tabContainerSetting: TabContainerSetting;
}

export interface RouterConfig {
  keepAliveSetting: KeepAliveSetting
}

export interface GlobConfig {
  // Site title
  title: string;
}

