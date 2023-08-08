import { MenuList, MenuTreeList } from '@models/auth/memu';
import { LoginByUsernameReq, LoginRes } from '@models/auth';
import { CurrentUserRes } from '@models/auth/user';
import { Page } from '@models/base';
import { ReminderMessage, ReminderNotice, ReminderTodo } from '@models/user';
import { PageReq } from '@models/base/pageReq';
import { Project, ProjectReq } from '@models/project';
import { Dict } from '@models/config/dict';
import { DictReq } from '@models/config/dictReq';
import { queryFetch, mutationFetch, queryFetchPage } from "./query";

enum Api {
    Login = '/login',
    Logout = '/logout',
    GetCurrentUser = '/current/user',
    GetCurrentMenuTreeList = '/current/menuTreeList',
    GetCurrentMenuList = '/current/menuList',
    GetPermissionList = '/getPermissionList',
    GetNoticeList = '/getNoticeList',
    GetMessageList = '/getMessageList',
    GetTodoList = '/getTodoList',
    GetProjectList = '/getProjectList',
    GetDictsByCode = '/getDictsByCode',
}

export const mutationLogin = mutationFetch<LoginRes, LoginByUsernameReq>({ url: Api.Login })
export const queryLogout = queryFetch({ url: Api.Logout })
export const queryGetCurrentUser = queryFetch<CurrentUserRes>({ url: Api.GetCurrentUser })
export const queryGetCurrentMenuTreeList = queryFetch<MenuTreeList>({ url: Api.GetCurrentMenuTreeList })
export const queryGetCurrentMenuList = queryFetch<MenuList>({ url: Api.GetCurrentMenuList })
export const queryGetPermissionList = queryFetchPage<string[] | number[]>({ url: Api.GetPermissionList })
export const queryGetNoticeList = queryFetchPage<Page<ReminderNotice>, PageReq>({ url: Api.GetNoticeList })
export const queryGetMessageList = queryFetchPage<Page<ReminderMessage>, PageReq>({ url: Api.GetMessageList })
export const queryGetTodoList = queryFetchPage<Page<ReminderTodo>, PageReq>({ url: Api.GetTodoList })
export const queryGetProjectList = queryFetchPage<Page<Project>, ProjectReq>({ url: Api.GetProjectList })
export const queryGetDictsByCode = queryFetch<Dict[], DictReq>({ url: Api.GetDictsByCode })
