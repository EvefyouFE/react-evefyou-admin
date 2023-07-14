import { MenuTreeList } from '@models/auth/memu';
import { LoginByUsernameReq, LoginRes } from '@models/auth';
import { CurrentUserRes } from '@models/auth/user';
import { Page, Res } from '@models/base';
import { useCreate, useGetList, useGetOne, useGetPage } from '@/hooks';
import { ReminderMessage, ReminderNotice, ReminderTodo } from '@models/user';
import { PageReq } from '@models/base/pageReq';
import { Project, ProjectReq } from '@models/project';
import { Dict } from '@models/config/dict';
import { DictReq } from '@models/config/dictReq';

export const fetchLogin = async (params: LoginByUsernameReq) => await useCreate<LoginByUsernameReq, Res<LoginRes>>("/login", params);
export const fetchGetCurrentUser = () => useGetOne<Res<CurrentUserRes>>("/current/user");
export const fetchGetCurrentMenus = () => useGetList<Res<MenuTreeList>>('/current/menu');
export const fetchGetNoticeList = (params?: PageReq) => useGetPage<Res<Page<ReminderNotice>>>('/getNoticeList',{params});
export const fetchGetMessageList = (params?: PageReq) => useGetPage<Res<Page<ReminderMessage>>>('/getMessageList',{params});
export const fetchGetTodoList = (params?: PageReq) => useGetPage<Res<Page<ReminderTodo>>>('/getTodoList',{params});
export const fetchGetProjectList = (params?: ProjectReq) => useGetPage<Res<Page<Project>>>('/getProjectList',{params});
export const fetchGetDictsByCode = (params: DictReq) => useGetList<Res<Dict[]>>('/getDictsByCode',{params});


