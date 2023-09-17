<p align="center">
  <a href="https://ant.design">
    <img width="200" src="">
  </a>
</p>

<h1 align="center">React-Evefyou-Admin</h1>

<div align="center">

一个基于react-evefyou-app的后台管理预设模板项目

中文 | [English](./README.md)

## ✨ 特性

- 常规路由页面
- 基于 react-query 的简单易用的 fetch
- 基于recoil，可以像 pinia 一样在 react 中定义全局管理状态
- 您可以在 react 中注册属性，而不是直接分配它们
- 缓存路由器
- 在每个组件中使用 Windicss 和 css 注入
- 使用 react-intl 实现国际化处理
- 使用 react-evefyou-hooks 定义可继承的状态钩子并支持 typecript

### 约定式路由页面结构

#### 通用例子

```
- pages
    - login (Already built into the library)
        $.ts
    - views
        $.ts (Already built into the library)
        $index.ts
        - dashboard
            $index.tsx
        - project
            $index.tsx
            $List.tsx
    - other
        $.ts
```

#### 最简例子

```
- views
    $index.ts
    - dashboard
        $index.tsx
    - project
        $index.tsx
        $List.tsx
```

### 请求数据

```
import { queryFetch, queryFetchPage, MenuTreeList, Page } from "react-evefyou-app";
import { Project, ProjectReq } from '@models/project';

enum Api {
    GetProjectList = '/getProjectList',
}

export const queryGetProjectList = queryFetchPage<Page<Project>, ProjectReq>({ url: Api.GetProjectList })

queryGetProjectList.useQuery({
    params,
})
queryGetProjectList.useQueryRes({
    params,
})
queryGetProjectList.fetchQuery({
    params,
})
```
