/*
 * @Author: EvefyouFE
 * @Date: 2023-07-16 16:27:02
 * @FilePath: \react-evefyou-admin\types\global.d.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
declare type Recordable<T = any> = Record<string, T>;
declare type Nullable<T> = T | null;
declare type TreeList<
    T,
    IDN extends string = 'id',
    PIDN extends string = 'pId',
    ID extends string | number = number
> = { [Key in IDN | PIDN]: ID; } & T;
declare type TreeNode<T> = { children?: TreeNode<T>[]; } & T;
declare type PropName<V = any, N extends string = string> = {
    [K in N]: V;
}
declare type UnwrapNullable<T> = T extends Nullable<infer O> ? O : T;

declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
}

declare type Union<U = any, T = any> = {
    [key in keyof (U & T)]: (U & T)[key];
};

declare type Value = string | number | object | Recordable

declare interface ImportMetaEnv {
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly VITE_PORT: number;
    readonly VITE_USE_MOCK: boolean;
    readonly VITE_USE_PWA: boolean;
    readonly VITE_PUBLIC_PATH: string;
    readonly VITE_PROXY: [string, string][];
    readonly VITE_GLOB_APP_TITLE: string;
    readonly VITE_GLOB_APP_SHORT_NAME: string;
    readonly VITE_USE_CDN: boolean;
    readonly VITE_DROP_CONSOLE: boolean;
    readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    readonly VITE_LEGACY: boolean;
    readonly VITE_USE_IMAGEMIN: boolean;
    readonly VITE_GENERATE_UI: string;
}
