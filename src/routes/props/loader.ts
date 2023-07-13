import { CrRouteObject, RouteMenuItem } from "@/types/route";
import { queryGetCurrentMenus, queryGetCurrentUser, queryGetMessageList, queryGetNoticeList, queryGetTodoList } from "@api/query";
import { User } from "@models/auth";
import { MenuTreeList } from "@models/auth/memu";
import { Res } from "@models/base";
import { QueryClient } from "@tanstack/react-query";

export interface CrumbData {
    title: string;
    menuTreeList?: MenuTreeList;
}

export interface HomeLoaderData {
    userInfoRes?: Res<User>;
}

export function cumbLoaderFn(
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
export function homeLoaderFn(queryClient: QueryClient): () => Promise<HomeLoaderData>  {
    return async () => {
        const queryCurrentUser = queryGetCurrentUser();
        const userInfoRes = queryClient.getQueryData<Res<User>>(queryCurrentUser.queryKey)
            ?? (await queryClient.fetchQuery(queryCurrentUser));

        queryClient.fetchQuery({
            ...queryGetCurrentMenus(),
            staleTime: Infinity,
        });
        queryClient.fetchQuery(queryGetNoticeList());
        queryClient.fetchQuery(queryGetMessageList());
        queryClient.fetchQuery(queryGetTodoList());

        return {
            userInfoRes
        }
    }
}

