<p align="center">
  <a href="https://ant.design">
    <img width="200" src="">
  </a>
</p>

<h1 align="center">React-Evefyou-Admin</h1>

<div align="center">

Simple and easy to use react Admin application template design UI library.

English | [中文](./README-zh_CN.md)

## ✨ Features

- Only one App entry without setup router, fetch, store.
- React18+ React-router6+
- Conventional Routing
- Simple and easy-to-use fetch based on react-query
- Based on recoil, store status can be defined in react like pinia
- You can register properties in react instead of assigning them directly
- KeepAlive Router
- Using Ant Design UI
- Using Tailwind Windicss and css inject in every component
- Using react-intl to implement internationalization processing
- Using react-evefyou-hooks define inheritable state hooks and support typecript
- Base Vite build

### Conventional Routing Page structure

#### common example

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

#### simple example

```
- views
    $index.ts
    - dashboard
        $index.tsx
    - project
        $index.tsx
        $List.tsx
```

### Fetching data

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
