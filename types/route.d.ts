
declare type PageModule = {
    default: React.ComponentType<any>;
    // 其他额外的属性
    [key: string]: React.ComponentType<any>;
};

declare type LazyModule = Promise<PageModule>;
declare type LazyModuleFn = () => LazyModule;

declare type ModulesObject = Record<string, LazyModuleFn>;

declare type RouteModulesObject = Record<string, LazyModuleFn | ModulesObject>;

declare type RoutePathConfigValue = Record<string, LazyModuleFn | ModulesObject | RoutePathConfigValue>;
declare type RoutePathConfig = Record<string, RoutePathConfigValue>;

declare interface RouteMenuItem {
    name?: string;
    path: string;
    locale?: string;
    icon?: string;
}

declare type CrRouteObject = Omit<MRouteObject, 'children'|'lazy'> & Omit<RouteMenuItem,'path'> & {
    children?: CrRouteObject[] | undefined;
    lazy?: LazyRouteFunction<CrRouteObject>;
}