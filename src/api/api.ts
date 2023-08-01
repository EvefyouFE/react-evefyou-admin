import { MenuList, MenuTreeList } from '@models/auth/memu';
import { LoginByUsernameReq, LoginRes } from '@models/auth';
import { CurrentUserRes } from '@models/auth/user';
import { Page, Res } from '@models/base';
import { ReminderMessage, ReminderNotice, ReminderTodo } from '@models/user';
import { PageReq } from '@models/base/pageReq';
import { Project, ProjectReq } from '@models/project';
import { Dict } from '@models/config/dict';
import { DictReq } from '@models/config/dictReq';
import { mutationFetchUrl, queryFetchOptions, queryFetchUrl } from ".";
import { FetchTypeEnum } from "@/enums/queryEnum";

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
const Options = {
    GetNoticeList: { url: Api.GetNoticeList, type: FetchTypeEnum.getPage },
    GetMessageList: { url: Api.GetMessageList, type: FetchTypeEnum.getPage },
    GetTodoList: { url: Api.GetTodoList, type: FetchTypeEnum.getPage },
    GetProjectList: { url: Api.GetProjectList, type: FetchTypeEnum.getPage },
}

export const mutationLogin = mutationFetchUrl<Res<LoginRes>, LoginByUsernameReq>(Api.Login)
export const queryLogout = queryFetchUrl(Api.Logout)
export const queryGetCurrentUser = queryFetchUrl<Res<CurrentUserRes>>(Api.GetCurrentUser)
export const queryGetCurrentMenuTreeList = queryFetchUrl<Res<MenuTreeList>>(Api.GetCurrentMenuTreeList)
export const queryGetCurrentMenuList = queryFetchUrl<Res<MenuList>>(Api.GetCurrentMenuList)
export const queryGetPermissionList = queryFetchUrl<Res<string[] | number[]>>(Api.GetPermissionList)
export const queryGetNoticeList = queryFetchOptions<Res<Page<ReminderNotice>>, PageReq>(Options.GetNoticeList)
export const queryGetMessageList = queryFetchOptions<Res<Page<ReminderMessage>>, PageReq>(Options.GetMessageList)
export const queryGetTodoList = queryFetchOptions<Res<Page<ReminderTodo>>, PageReq>(Options.GetTodoList)
export const queryGetProjectList = queryFetchOptions<Res<Page<Project>>, ProjectReq>(Options.GetProjectList)
export const queryGetDictsByCode = queryFetchUrl<Res<Dict[]>, DictReq>(Api.GetDictsByCode)