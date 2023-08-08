declare interface Option {
    key: string;
    title?: string;
    value?: string;
}

declare interface SorterParam {
    order: MSortOrder;
    field: string;
}

declare type SortFn = <T>(sortInfo: MSorterResult<T>) => SorterParam | {};
declare type FilterFn = (data: Recordable) => Recordable;


declare type PropsWithCls<P = unknown> = P & {
    className?: string | undefined;
};

declare type PropsWithChildrenCls<P = unknown> = P & {
    children?: MReactNode | undefined;
    className?: string | undefined;
};