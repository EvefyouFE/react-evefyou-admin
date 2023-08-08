import { clone, pick } from "ramda";
import { MenuItem, MenuTreeList } from "@/models/auth";


export function transforRoutesToMenuTreeList(
    routes: CrRouteObject[],
    callback?: (route: CrRouteObject) => CrRouteObject
): MenuTreeList {
    const mRoutes = routes.find(r => r.path === '/')?.children ?? []
    return clone(mRoutes).filter(r => !r.index).reduce(function fn(acc, route) {
        const children = route.children?.reduce(fn, [] as MenuTreeList)
        const newRoute = callback ? callback(route) : route
        acc.push({
            ...pick(['name', 'icon', 'path', 'locale'], newRoute),
            children
        } as MenuItem)
        return acc
    }, [] as MenuTreeList)
}

export function transforRoutePathToPermissionCode(
    path: string
): string {
    return path.replaceAll('/', ':').slice(1)
}