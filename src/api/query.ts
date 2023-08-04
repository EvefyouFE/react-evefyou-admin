import { FetchQueryOptions, MutationOptions, QueryClient, QueryFunction, QueryKey, QueryObserverOptions, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { values } from "ramda";
import { defHttp } from "./request";
import { FetchTypeEnum } from "@/enums/queryEnum";
import { AxiosRequestConfig } from "axios";

export interface FetchFn<T = any, D = any> {
    (cfg: AxiosRequestConfig<D>, opt: RequestOptions): T | Promise<T>
}
export interface FetchQueryOptionsFn<T = any, D = any> {
    (cfg?: AxiosRequestConfig<D>, options?: RequestOptions): UseQueryOptions<T>
}
export interface FetchMutationOptionsFn<T = any, D = any> {
    (cfg?: AxiosRequestConfig<D>, options?: RequestOptions): UseMutationOptions<T, unknown, D>
}

export interface ExtQueryOptions<T> extends QueryObserverOptions<T> {
    fetchType?: FetchTypeEnum;
    autoQueryKey?: boolean;
}

export interface ExtMutationOptions<T, D> extends MutationOptions<T, unknown, D> {
    fetchType?: FetchTypeEnum;
}

export interface FetchFnParams<T = any, Params = any> {
    (params?: Params): T | Promise<T>
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
export function getFetchFn<T = any, D = any, QK extends QueryKey = QueryKey>(
    { fetchType: type = FetchTypeEnum.getOne }: ExtQueryOptions<T> | ExtMutationOptions<T, D>,
    cfg: AxiosRequestConfig<D>,
    opt?: RequestOptions
): QueryFunction<T, QK> {
    switch (type) {
        case FetchTypeEnum.create:
            return async () => defHttp.post<T, D>(cfg, opt)
        case FetchTypeEnum.update:
            return async () => defHttp.put<T, D>(cfg, opt)
        case FetchTypeEnum.delete:
            return async () => defHttp.delete<T, D>(cfg, opt)
        case FetchTypeEnum.getOne:
        case FetchTypeEnum.getList:
        case FetchTypeEnum.getPage:
        case FetchTypeEnum.batch:
        default:
            return () => defHttp.get<T, D>(cfg, opt)
    }
}
export function useQueryData<TData>(
    opt: ExtQueryOptions<TData>
) {
    return useQuery<TData>(opt)
}
export function getQueryData<TData>(
    opt: UseQueryOptions<TData>
) {
    if (!opt.queryKey) {
        throw new Error('queryKey is needed in query!')
    }
    return queryClient.getQueryData<TData>(opt.queryKey)
}
export async function fetchQuery<TData>(
    opt: FetchQueryOptions<TData>
) {
    if (!opt.queryKey) {
        throw new Error('queryKey is needed in query fetch!')
    }
    return await queryClient.fetchQuery(opt)
}


interface CbFn<T, R> {
    (opt: ExtQueryOptions<T>): R;
}
interface RtFn<T, D, R> {
    (
        cfg?: AxiosRequestConfig<D>,
        qopt?: ExtQueryOptions<T>,
        ropt?: RequestOptions
    ): R;
}
interface Fn<T, D> {
    <R>(cb: CbFn<T, R>): RtFn<T, D, R>
}
interface AsyncFn<T, D> {
    <R>(cb: CbFn<T, Promise<R>>): RtFn<T, D, Promise<R>>
}
interface MultiFn<T, D> {
    <R>(cb: CbFn<T, R>, cb2: CbFn<T, Promise<R>>): RtFn<T, D, Promise<R>>
}

function getOptions<T, D>(
    optionsFn: FetchQueryOptionsFn<T, D>,
    cfg?: AxiosRequestConfig<D>,
    qopt?: ExtQueryOptions<T>,
    ropt?: RequestOptions,
) {
    return { ...optionsFn(cfg, ropt), ...qopt }
}
function getResOptions<T, D>(
    optionsFn: FetchQueryOptionsFn<T, D>,
    cfg?: AxiosRequestConfig<D>,
    qopt?: ExtQueryOptions<Res<T>>,
    ropt?: RequestOptions,
) {
    const options = { ...(optionsFn(cfg, ropt) as Res<T>), ...qopt }
    const queryKey = [...options.queryKey ?? [], 'res']
    return { ...options, queryKey, ...qopt }
}
export function query<T, D>(
    optionsFn: FetchQueryOptionsFn<T, D>
) {
    const fn: Fn<T, D> = (cb) => (cfg, qopt, ropt) => cb(getOptions(optionsFn, cfg, qopt, ropt))
    const asyncFn: AsyncFn<T, D> = (cb) => async (cfg, qopt, ropt) => await cb(getOptions(optionsFn, cfg, qopt, ropt))
    const resFn: Fn<Res<T>, D> = (cb) => (cfg, qopt, ropt = { isTransformResponse: false }) =>
        cb(getResOptions(optionsFn, cfg, qopt, ropt))
    const resAsyncFn: AsyncFn<Res<T>, D> = (cb) => async (cfg, qopt, ropt = { isTransformResponse: false }) =>
        await cb(getResOptions(optionsFn, cfg, qopt, ropt))
    const multiFn: MultiFn<T, D> = (cb, cb2) => async (cfg, qopt, ropt = { isTransformResponse: false }) => {
        const options = getOptions(optionsFn, cfg, qopt, ropt)
        return cb(options) ?? await cb2(options)
    }
    const multiResFn: MultiFn<Res<T>, D> = (cb, cb2) => async (cfg, qopt, ropt = { isTransformResponse: false }) => {
        const options = getResOptions(optionsFn, cfg, qopt, ropt)
        return cb(options) ?? await cb2(options)
    }
    return {
        optionsFn,
        useQuery: fn(useQueryData),
        getQueryData: fn(getQueryData),
        fetchQuery: asyncFn(fetchQuery),
        useQueryRes: resFn(useQueryData),
        getQueryDataRes: resFn(getQueryData),
        fetchQueryRes: resAsyncFn(fetchQuery),
        getOrFetchData: multiFn(getQueryData, fetchQuery),
        getOrFetchDataRes: multiResFn(getQueryData, fetchQuery),
    }
}

export function getQueryKey<T = any, D = any>(
    cfg: AxiosRequestConfig<D>,
    opt?: ExtQueryOptions<T>,
) {
    const queryKey = opt?.queryKey ?? cfg.url?.split('/').slice(1)
    const autoQueryKey = opt?.autoQueryKey ?? true
    return autoQueryKey && cfg.params ? [...queryKey ?? [], ...values(cfg.params)] : queryKey
}

export function getQueryOptionsFn<T = any, D = any>(
    cfg: AxiosRequestConfig<D>,
    qopt: ExtQueryOptions<T> = { fetchType: FetchTypeEnum.getOne },
    ropt?: RequestOptions
) {
    return {
        queryKey: getQueryKey(cfg, qopt),
        queryFn: getFetchFn(qopt, cfg, ropt),
    } as UseQueryOptions<T>
}
export function queryFetch<T, D = any>(
    d_cfg: AxiosRequestConfig<D>,
    qopt: ExtQueryOptions<T> = { fetchType: FetchTypeEnum.getOne },
    d_ropt?: RequestOptions
) {
    const queryOptionsFn = (
        cfg?: AxiosRequestConfig<D>,
        ropt?: RequestOptions
    ) => getQueryOptionsFn({ ...d_cfg, ...cfg }, qopt, { ...d_ropt, ...ropt })
    return query(queryOptionsFn)
}
export function queryFetchPage<T, D = any>(
    d_cfg: AxiosRequestConfig<D>,
    qopt: ExtQueryOptions<T> = { fetchType: FetchTypeEnum.getPage },
    d_ropt?: RequestOptions
) {
    return queryFetch(d_cfg, qopt, d_ropt)
}

export function mutaion<T = any, D = void>(
    optionFn: FetchMutationOptionsFn<T, D>
) {
    return {
        useMutation: (
            opt?: UseMutationOptions<T, unknown, D>,
            cfg?: AxiosRequestConfig<D>,
            ropt?: RequestOptions
        ) => useMutation({ ...optionFn(cfg, ropt), ...opt }),
    }
}
export function getMutaionOptionsFn<T = any, D = any>(
    cfg: AxiosRequestConfig<D>,
    ropt?: RequestOptions,
    qopt?: ExtMutationOptions<T, D>,
) {
    return {
        mutationFn: getFetchFn({ fetchType: FetchTypeEnum.create, ...qopt }, cfg, ropt),
    } as UseMutationOptions<T, unknown, D>
}

export function mutationFetch<T = any, D = any>(
    d_cfg: AxiosRequestConfig<D>,
    d_ropt?: RequestOptions,
    qopt?: ExtMutationOptions<T, D>,
) {
    const mutationOptionsFn = (
        cfg?: AxiosRequestConfig<D>,
        ropt?: RequestOptions
    ) => getMutaionOptionsFn({ ...d_cfg, ...cfg }, { ...d_ropt, ...ropt }, qopt)
    return mutaion(mutationOptionsFn)
}