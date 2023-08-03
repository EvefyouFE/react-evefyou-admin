import { queryGetCurrentMenuTreeList, queryGetCurrentUser, queryGetMessageList, queryGetNoticeList, queryGetTodoList } from "@/api";
import { UserInfo } from "@models/auth";
import { MenuTreeList } from "@models/auth/memu";

export interface CrumbData {
    title: string;
    menuTreeList?: MenuTreeList;
}

export interface HomeLoaderData {
    userInfoRes?: Res<UserInfo>;
}

export function crumbLoaderFn(
    routeMenuItem?: RouteMenuItem,
    routes?: CrRouteObject[]
): () => CrumbData {
    return () => {
        return {
            title: routeMenuItem?.locale ? routeMenuItem?.locale : routeMenuItem?.name || '',
            menuTreeList: routes?.reduce((acc, cur) => cur && [...acc, {
                icon: cur.icon,
                locale: cur.locale,
                name: cur.name || '',
                path: cur.path || '',
                key: cur.path || ''
            }], [] as MenuTreeList)
        }
    };
}

/**
 * 
 * @returns 
 */
export function homeLoaderFn(): () => Promise<HomeLoaderData> {
    return async () => {
        const userInfoRes = await queryGetCurrentUser.getOrFetchDataRes()

        queryGetCurrentMenuTreeList.fetchQuery({
            staleTime: Infinity
        })
        queryGetNoticeList.fetchQuery()
        queryGetMessageList.fetchQuery()
        queryGetTodoList.fetchQuery()
        return {
            userInfoRes
        } as HomeLoaderData
    }
}

