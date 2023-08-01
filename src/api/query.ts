import { FetchQueryOptions, QueryClient, QueryKey, UseMutationOptions, UseQueryOptions, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { Res } from "@models/index";
import { values } from "ramda";
import { defHttp } from "./request/request";
import { FetchTypeEnum } from "@/enums/queryEnum";

export interface FetchFn<T = any, Params = any> {
    (params?: Params): T | Promise<T>
}



export interface FetchOptions {
    url: string;
    queryKey?: QueryKey;
    type?: FetchTypeEnum;
}


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
export function getFetchFn<T = any, Params = any>({ url, type = FetchTypeEnum.getOne }: FetchOptions): FetchFn<T, Params> {
    switch (type) {
        case FetchTypeEnum.create:
            return async (params?: Params) => defHttp.post({
                url,
                params
            })
        case FetchTypeEnum.update:
            return async (params?: Params) => defHttp.put({
                url,
                params
            })
        case FetchTypeEnum.delete:
            return async (params?: Params) => defHttp.delete({
                url,
                params
            })
        case FetchTypeEnum.getOne:
        case FetchTypeEnum.getList:
        case FetchTypeEnum.getPage:
        case FetchTypeEnum.batch:
        default:
            return (params?: Params) => defHttp.get({
                url,
                params
            })
    }
}

export interface FetchFnParams<T = any, Params = any> {
    (params?: Params): T | Promise<T>
}

export function getQueryOptionsFn<F extends FetchFn<T>, T = any>(
    queryKey: QueryKey,
    fn: F
) {
    return (params?: F extends FetchFn<any, infer P> ? P : unknown) => ({
        queryKey: params ? [...queryKey, ...values(params || {})] : queryKey,
        queryFn: () => fn(params),
    }) as UseQueryOptions<T>
}

export function getMutaionOptions<F extends FetchFn>(
    fn: F
) {
    return {
        mutationFn: fn,
    } as UseMutationOptions<
        F extends FetchFn<infer T> ? T : unknown,
        unknown,
        F extends FetchFn<any, infer P> ? P : unknown
    >
}

export function useQueryRes<
    T, TError = unknown, TQueryKey extends QueryKey = QueryKey
>(
    options: UseQueryOptions<Res<T>, TError, Res<T>, TQueryKey>
) {
    const { data, ...rest } = useQuery(options)
    return {
        data: data?.data,
        ...rest
    } as UseQueryResult<T | undefined, TError>
}

export function getQueryData<TData>(
    options: UseQueryOptions<TData>
) {
    if (!options.queryKey) {
        throw new Error('queryKey is needed in query!')
    }
    return queryClient.getQueryData<TData>(options.queryKey)
}
export function getQueryDataRes<TData>(
    options: UseQueryOptions<Res<TData>>
) {
    const res = getQueryData(options)
    return res?.data
}

export async function fetchQuery<TData>(
    options: FetchQueryOptions<TData>
) {
    if (!options.queryKey) {
        throw new Error('queryKey is needed in query fetch!')
    }
    return await queryClient.fetchQuery(options)
}
export async function fetchQueryRes<T>(
    options: FetchQueryOptions<Res<T>>
) {
    const res = await fetchQuery(options)
    return res?.data
}

export function query<Params, TData>(
    optionsFn: (params?: Params) => UseQueryOptions<Res<TData>>
) {
    return {
        optionsFn,
        useQuery: (cfg?: {
            params?: Params,
            options?: UseQueryOptions<Res<TData>>
        }) => useQuery({ ...optionsFn(cfg?.params), ...cfg?.options }),
        useQueryRes: (cfg?: {
            params?: Params,
            options?: UseQueryOptions<Res<TData>>
        }) => useQueryRes({ ...optionsFn(cfg?.params), ...cfg?.options }),
        getQueryData: (cfg?: {
            params?: Params,
            options?: UseQueryOptions<Res<TData>>
        }) => getQueryData({ ...optionsFn(cfg?.params), ...cfg?.options }),
        getQueryDataRes: (cfg?: {
            params?: Params,
            options?: UseQueryOptions<Res<TData>>
        }) => getQueryDataRes({ ...optionsFn(cfg?.params), ...cfg?.options }),
        fetchQuery: (cfg?: {
            params?: Params,
            options?: FetchQueryOptions<Res<TData>>
        }) => fetchQuery({ ...optionsFn(cfg?.params), ...cfg?.options }),
        fetchQueryRes: (cfg?: {
            params?: Params,
            options?: FetchQueryOptions<Res<TData>>
        }) => fetchQueryRes({ ...optionsFn(cfg?.params), ...cfg?.options }),
    }
}

export function queryFetch<F extends FetchFn<Res<any>>, T = F extends FetchFn<Res<infer T>> ? T : unknown>(
    queryKey: QueryKey,
    fn: F
) {
    return query(getQueryOptionsFn<F, Res<T>>(queryKey, fn))
}

export function queryFetchOptions<T extends Res<any> = Res<any>, Params = any>(
    { url,
        queryKey,
        type = FetchTypeEnum.getOne, }: FetchOptions
) {
    return queryFetch(queryKey ?? url.split('/').slice(1), getFetchFn<T, Params>({ url, type }))
}

export function queryFetchUrl<T extends Res<any> = Res<any>, Params = any>(
    url: string
) {
    return queryFetchOptions<T,Params>({ url })
}

export function mutaion<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    options: UseMutationOptions<TData, TError, TVariables, TContext>
) {
    return {
        useMutation: (ext?: UseMutationOptions<TData, TError, TVariables, TContext>) => useMutation({ ...options, ...ext }),
    }
}

export function mutationFetch<F extends FetchFn>(
    fn: F
) {
    return mutaion(getMutaionOptions(fn))
}

export function mutationFetchOptions<T = any, Params = any>(
    { url, type = FetchTypeEnum.create }: FetchOptions
) {
    return mutationFetch(getFetchFn<T, Params>({ url, type }))
}

export function mutationFetchUrl<T = any, Params = any>(
    url: string
) {
    return mutationFetchOptions<T, Params>(({ url }))
}