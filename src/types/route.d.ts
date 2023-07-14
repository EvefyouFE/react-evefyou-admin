import { IconObject } from './config';

export type PageModule = {
    default: React.ComponentType<any>;
    // 其他额外的属性
    [key: string]: React.ComponentType<any>;
};

export type LazyModule = Promise<PageModule>;
export type LazyModuleFn = () => LazyModule;

export type ModulesObject = Record<string, LazyModuleFn>;

export type RouteModulesObject = Record<string, LazyModuleFn | ModulesObject>;

export type RoutePathConfigValue = Record<string, LazyModuleFn | ModulesObject | RoutePathConfigValue>;
export type RoutePathConfig = Record<string, RoutePathConfigValue>;

export interface RouteMenuItem {
    name?: string;
    path: string;
    locale?: string;
    icon?: IconObject;
}

export type CrRouteObject = Omit<import('react-router').RouteObject, 'children'|'lazy'> & Omit<RouteMenuItem,'path'> & {
    children?: CrRouteObject[] | undefined;
    lazy?: LazyRouteFunction<CrRouteObject>;
}