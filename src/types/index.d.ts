declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
}

declare type Union<U = any,T = any> = {
    [key in keyof (U&T)]: (U&T)[key];
};

