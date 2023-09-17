/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:30
 * @FilePath: \react-evefyou-admin\src\api\index.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { queryFetch, queryFetchPage, MenuTreeList, Page } from "react-evefyou-app";
import { Project, ProjectReq } from '@models/project';
import { Dict } from '@models/config/dict';
import { DictReq } from '@models/config/dictReq';

enum Api {
    GetCurrentMenuTreeList = '/current/menuTreeList',
    GetPermissionList = '/getPermissionList',
    GetProjectList = '/getProjectList',
    GetDictsByCode = '/getDictsByCode',
}

export const queryGetCurrentMenuTreeList = queryFetch<MenuTreeList>({ url: Api.GetCurrentMenuTreeList })
export const queryGetPermissionList = queryFetchPage<string[] | number[]>({ url: Api.GetPermissionList })
export const queryGetProjectList = queryFetchPage<Page<Project>, ProjectReq>({ url: Api.GetProjectList })
export const queryGetDictsByCode = queryFetch<Dict[], DictReq>({ url: Api.GetDictsByCode })
