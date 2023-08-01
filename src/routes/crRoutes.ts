import { DEFAULT_MENU_SETTING } from '@/config';
import { assocPath } from 'ramda';
import { crumbLoaderFn, handleFn, homeLoaderFn } from './props';
import { wrapComponent } from './props/element';
import { errorBoundary } from './props/errorElemnt';

/**
 * 
 * @param filePath 
 * @param excludePath 
 * @returns [routePaths, 带'/'的routePaths]
 */
function handleFilePath(filePath: string, excludePath: string = ''): string[][] {
    const routePaths = filePath
        // 去除 src/pages 不相关的字符
        .replace(excludePath, '')
        // 去除文件名后缀
        .replace(/.tsx?/, '')
        // 转换动态路由 $[foo].tsx => :foo
        .replace(/\$\[([\w-]+)]/, ':$1')
        // 转换以 $ 开头的文件
        .replace(/\$([\w-]+)/, '$1')
        .toLowerCase()
        // 以目录分隔
        .split('/');
    // path改为 '/xx/xx' 格式
    const paths = routePaths
        .filter((path) => path !== '$')
        .reduce((prev, cur) => [...prev, `${prev[prev.length - 1]}/${cur}`], [''] as string[])
        .slice(1);
    return [routePaths, paths];
}

/**
 * 根据 pages 目录生成路径配置
 * { 'path': () => import() } => { 'path': ( { 'path': () => import() } | (() => import()) )  }
 */
function generatePathConfig(modules: ModulesObject, excludePath: string): RouteModulesObject {
    return Object.keys(modules).reduce((acc,filePath) => {
        const pathss =handleFilePath(filePath,excludePath)
        return assocPath(pathss[1].length === 0 ? pathss[0] : pathss[1], modules[filePath], acc);
    }, {});
}

/**
 * 将文件路径配置映射为 react-router 路由
 * { 'path': { 'path': () => import() } | ...  } => routes
 */
function mapPathConfigToRoute(cfg: RoutePathConfig, isPageView: boolean = false): CrRouteObject[] {
    // route 的子节点为数组
    return Object.entries(cfg).map(([path, child]: [string, LazyModuleFn | ModulesObject]) => {
        //扩展菜单配置
        const locale = 'menu'.concat(path.replaceAll('/', '.'))
        const name = path.slice(path.lastIndexOf('/') + 1)
        const icon = DEFAULT_MENU_SETTING.menuIconMap[path.slice(path.lastIndexOf('/') + 1)]
            || DEFAULT_MENU_SETTING.menuIconMap['default']

        // () => import() 语法判断
        if (typeof child === 'function') {
            // 等于 index 则映射为当前根路由
            const isIndex = path.endsWith('/index');
            const childView = child()
            return {
                index: isIndex,
                path: isIndex ? undefined : path,
                // 转换为组件
                // element: wrapElemnt(child,{isPageView:childWrapPageContainer}),
                lazy: async () => ({ Component: wrapComponent((await childView)?.default) }),
                handle: !isIndex && handleFn({ title: locale }),
                // errorElemnt: errorBoundary(),
                locale,
                name,
            };
        }
        // 否则为目录，则查找下一层级
        const { $, ...rest } = child;
        const children = mapPathConfigToRoute(rest, isPageView);
        return {
            path: path,
            // layout 处理
            // element: wrapElemnt($),
            // lazy: async () => ({Component: wrapComponent($)}),
            // 递归 children
            children,
            loader: (children && children.length === 1 && children[0].path === undefined)
                ? undefined
                : crumbLoaderFn({ locale, name, icon, path }, children),
            handle: (children && children.length === 1 && children[0].path === undefined)
                ? handleFn({ title: locale })
                : handleFn(),
            // errorElemnt: errorBoundary(),
            locale,
            name,
            icon,
        };
    });
}

/**
 * 去掉path为undefined且只有一个的子节点
 * @param routes 
 * @returns 
 */
function handleRoutesUndifinedPath(routes?: CrRouteObject[]): CrRouteObject[] | undefined {
    return routes && routes.reduce((acc, cur) => {
        if (cur && cur.children && cur.children.length === 1 && cur.children[0].path === undefined) {
            return [...acc, {
                ...cur,
                element: cur.children[0].element,
                lazy: cur.children[0].lazy,
                children: undefined
            }];
        } else if (cur && cur.children) {
            return [...acc, {
                ...cur,
                children: handleRoutesUndifinedPath(cur.children)
            }]
        }
        return [...acc, cur];
    }, [] as CrRouteObject[]);
}

function generateCrRoutes(): CrRouteObject[] {
    // 扫描 src/pages 下的所有具有路由文件
    const viewModules = import.meta.glob<PageModule>('/src/pages/views/**/$*.{ts,tsx}');
    const loginModules = import.meta.glob<PageModule>('/src/pages/login/**/$*.{ts,tsx}');
    const { $: $viewFn, ...viewsPathConfig } = generatePathConfig(viewModules, '/src/pages/views/');
    const { $: $loginFn, ...loginPathConfig } = generatePathConfig(loginModules, '/src/pages/login/');
    const viewRoutes = mapPathConfigToRoute(viewsPathConfig, true);
    const viewRoutesWithoutUndefined = handleRoutesUndifinedPath(viewRoutes);

    const loginRoutes = mapPathConfigToRoute(loginPathConfig);
    const loginRoutesWithoutUndefined = handleRoutesUndifinedPath(loginRoutes);
    // 提取跟路由的 layout
    const lazyView = ($viewFn as LazyModuleFn)()
    const lazyLogin = ($loginFn as LazyModuleFn)()
    return [
        {
            path: '/',
            // element: wrapElemnt($view as LazyModule, {auth:true}),
            lazy: async () => ({ Component: wrapComponent((await lazyView).default, { auth: true }) }),
            children: viewRoutesWithoutUndefined,
            loader: homeLoaderFn(),
            handle: handleFn({ title: 'menu.home', path: '/' }),
            errorElement: errorBoundary(),
        },
        {
            path: '/login',
            // element: wrapElemnt($login as LazyModule),
            lazy: async () => ({ Component: wrapComponent((await lazyLogin).default) }),
            children: loginRoutesWithoutUndefined,
            errorElement: errorBoundary(),
        },
    ];
}

export const crRoutes = generateCrRoutes();



function generateCrViewsPaths() {
    const viewModules = import.meta.glob('/src/pages/views/**/$*.{ts,tsx}');
    return Object.keys(viewModules).reduce((acc, filePath) => {
        const pathss = handleFilePath(filePath, '/src/pages/views/');
        const paths = pathss[1];
        const path = paths?.length > 0 && paths[paths.length-1]
        if(path && path !== '/index') 
            acc.push(path.replace('/index',''));
        return acc;
    }, [] as string[]);
}

export const viewsPaths = generateCrViewsPaths();



