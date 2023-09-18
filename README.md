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

### Conventional Routing

```
Parse files prefixed with $, as long as they meet the format, it does not need to be Vite
```

```
{
  '/src/views/$.ts': () => import('/src/views/$.ts'),
  '/src/views/dashboard/$index.tsx': () => import('/src/views/dashboard/$index.tsx'),
  '/src/views/dashboard/$Other.tsx': () => import('/src/views/dashboard/$Other.tsx'),
}
```

| file       | description                     |
| ---------- | ------------------------------- |
| $.ts       | Layout（nested Outlet if need） |
| $index.ts  | default page                    |
| $other.tsx |                                 |

#### Page structure

##### common example

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

##### simple example

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

### Define store state

```
export const DEFAULT_USER_STATE: UserState = {
    token: '',
    userInfo: null,
    isSessionTimeout: false,
    lastUpdateTime: new Date().getTime()
}

export const userAtom = atom<UserState>({
    key: 'userAtom',
    default: DEFAULT_USER_STATE
});

export const useUserRecoilState = defineRecoilValue({
    name: 'userState',
    state: DEFAULT_USER_STATE,
    getters: {
        getToken(state) {
            return state.token
        },
        ...
    },
    setters: {
        setToken(token: string) {
            this.setProps({ token })
        },
        ...
    },
    useFn: () => {
        const loginMutation = mutationLogin.useMutation()
        const navigate = useNavigate()
        const [, { setProps: setAuthProps, refreshAuthAction }] = useAuthRecoilState()
        return {
            loginMutation,
            setAuthProps,
            refreshAuthAction,
            navigate
        }
    },
    actions: {
        async login(
            params: LoginByUsernameReq,
            options?: {
                goHome?: boolean;
                mode?: ErrorMessageMode;
            },
        ): Promise<Nullable<UserInfo>> {
            try {
                const { goHome = true } = options ?? {};
                const { token } = await this.loginMutation.mutateAsync(params);
                this.setToken(token);
                ...
            } catch (error) {
                return Promise.reject(error);
            }
        }
    },
}, userAtom)
```

### Define inheritable state hook

```
export const defineActiveItemsState = <
  T extends KeyItem<K>,
  K = T extends KeyItem<infer P> ? P : React.Key,
  N extends string = string,
>(
  name: N = 'activeItemsState' as N
) => {
  const useKeyItemsState = defineKeyItemsState<T, K>()
  return defineUseState({
    name,
    useState: (initialSt?: ActiveItem<T, K>) => useRelationState({
      itemsState: useKeyItemsState(initialSt?.itemsState),
      activeKeyState: useState(initialSt?.activeKeyState)
    }),
    getters: {
      getActiveKey(state: ActiveItem<T, K>) {
        return state.activeKeyState
      },
      ...
    },
    setters: {
      active(key: K) {
        this.activeKeyState.set(key)
      }
      ...
    },
    actions: {
      removeByKey(key: K) {
        ...
      }
      ...
    }
  })
}

export const useTabsContainerItemsState = defineUseState({
  name: 'useTabsContainerItemsState',
  useState: () => useActiveItemsState(),
  getters: {
    getViewTabItems(state) {
      const items = state.itemsState
      if (items.length === 1) {
        items[0].closable = false;
      } else if (items.length > 1) {
        items[0].closable = true;
      }
      return items
    }
  }
})
```
