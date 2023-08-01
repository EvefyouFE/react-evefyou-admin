
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
declare type IsStringLiteralUnion<T> = string extends T ? false : true;
declare type IsObject<T> = T extends object ? true : false;
declare type IsNullable<T> = T extends Nullable<any> ? true : false;
declare type IsArray<T> = T extends Array<any> ? true : false;
declare type IsAny<T> = 0 extends 1 & T ? true : false;
declare type FirstElement<T extends readonly any[]> = T extends readonly [infer First, ...any[]] ? First : never;
declare type SecondElement<T extends readonly any[]> = T extends readonly [any, infer Second, ...any[]] ? Second : never;
declare type ThirdElement<T extends readonly any[]> = T extends readonly [any, any, infer Third, ...any[]] ? Third : never;
declare type FourthElement<T extends readonly any[]> = T extends readonly [any, any, any, infer Fourth, ...any[]] ? Fourth : never;
declare type FifthElement<T extends readonly any[]> = T extends readonly [any, any, any, any, infer Fifth, ...any[]] ? Fifth : never;
declare type LastElement<T extends readonly any[]> = T extends readonly [...any[], infer Last] ? Last : never;
declare type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : never;
declare type IsEmptyArray<T extends readonly any[]> = T extends readonly [] ? true : false;
declare type IsKeyof<P, O> = P extends keyof O ? true : false;

declare type ExtractNestedKeys<T, Excludes = 'children', UWT = UnwrapNullable<T>> =
    IsAny<UWT> extends true ? never :
    IsArray<UWT> extends true ? never :
    UWT extends {
        [key: string]: string | number | object | undefined;
    } ? never :
    UWT extends object
    ? {
        [K in keyof UWT]: K extends Excludes ? K :
        K | ExtractNestedKeys<UWT[K], Excludes>;
    }[keyof UWT]
    : never
/**
 * 字符串常量联合类型会被 |string 变为string类型，不支持any类型
 */
declare type ExtractNestedValues<T, Excludes = 'children', UWT = UnwrapNullable<T>> =
    IsAny<UWT> extends true ? never :
    IsArray<UWT> extends true ? never :
    UWT extends {
        [key: string]: string | number | object | undefined;
    } ? never :
    UWT extends object
    ? {
        [K in keyof UWT]:
        K extends Excludes ? never :
        IsAny<UWT[K]> extends true ? never :
        UWT[K] | ExtractNestedValues<UWT[K], Excludes>;
    }[keyof UWT]
    : never

declare type NestedPropType<KS extends readonly any[], O> =
    IsObject<O> extends true ?
    FirstElement<KS> extends keyof O ?
    IsEmptyArray<Tail<KS>> extends true ? O[FirstElement<KS>]
    : O[FirstElement<KS>] extends Nullable<infer NO> ? NestedPropType<Tail<KS>, NO>
    : NestedPropType<Tail<KS>, O[FirstElement<KS>]>
    : never
    : O;

declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
}

declare type Union<U = any, T = any> = {
    [key in keyof (U & T)]: (U & T)[key];
};

declare interface ViteEnv {
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_DROP_CONSOLE: boolean;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
}