import { QueryClient } from "@tanstack/react-query";
import { fetchGetCurrentMenus, fetchGetCurrentUser, fetchGetDictsByCode, fetchGetMessageList, fetchGetNoticeList, fetchGetProjectList, fetchGetTodoList, fetchLogin } from "./api";
import { LoginByUsernameReq } from "@models/auth";
import { PageReq } from "@models/base/pageReq";
import { values } from "ramda";
import { ProjectReq } from "@models/index";
import { DictReq } from "@models/config/dictReq";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            suspense: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchInterval: false,
            useErrorBoundary: true
        },
    },
});

export const queryGetCurrentMenus = () => ({
    queryKey: ['current', 'menus'],
    queryFn: () => fetchGetCurrentMenus()
})

export const queryGetCurrentUser = () => ({
    queryKey: ['current', 'user'],
    queryFn: () => fetchGetCurrentUser()
})

export const mutationLogin = () => ({
    mutationFn: async (params: LoginByUsernameReq) => await fetchLogin(params)
})

export const queryGetNoticeList = (params?: PageReq) => ({
    queryKey: ['getNoticeList',...values(params||{})],
    queryFn: () => fetchGetNoticeList(params)
})
export const queryGetMessageList = (params?: PageReq) => ({
    queryKey: ['getMessageList',...values(params||{})],
    queryFn: () => fetchGetMessageList(params)
})
export const queryGetTodoList = (params?: PageReq) => ({
    queryKey: ['getTodoList',...values(params||{})],
    queryFn: () => fetchGetTodoList(params)
})
export const queryGetProjectList = (params?: ProjectReq) => ({
    queryKey: ['getTodoList',...values(params||{})],
    queryFn: () => fetchGetProjectList(params)
})
export const queryGetDictsByCode = (params: DictReq) => ({
    queryKey: ['getDictsByCode',...values(params||{})],
    queryFn: () => fetchGetDictsByCode(params)
})

