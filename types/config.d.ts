declare interface IconMapSetting {
  [key: string]: string;
}

declare interface TabsMenuItem {
  title: string,
  icon: string,
}

declare interface ComponentTableFetchSetting {
  pageField: string;
  sizeField: string;
  listField: string;
  totalField: string;
}

declare interface ComponentTableSetting {
  fetchSetting: ComponentTableFetchSetting;
  pageSizeOptions: `${number}`[];
  pageSize: number;
  size: string;
  sortFn: SortFn;
  filterFn: FilterFn;
}

declare interface ComponentSetting {
  table: ComponentTableSetting;
}

declare interface LayoutSetting {
  fontSize: number;
  unit: string;
  siderWidth: number;
  headerHeight: number;
  pageTabsNavHeight: number;
  pageContainerPadding: number;
  footerHeight: number;
}

declare interface MenuSetting {
  showCollapsed: boolean;
  showMenu: boolean;
  collapsed: boolean;
  menuIconMap: IconMapSetting;
  isRoutesMenu: boolean;
  exposeMenuList: string[];
}

declare interface TabContainerSetting {
  tabsMenuList: TabsMenuItem[];
  indexRedirectPath: string;
}

declare interface KeepAliveSetting {
  includes?: string[];
  excludes?: string[];
  includeAll?: boolean;
  active?: boolean;
  maxLen?: number;
}

declare interface RouterConfig {
  keepAliveSetting: KeepAliveSetting;
}

declare interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}

declare interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}