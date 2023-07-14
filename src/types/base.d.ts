
export type PropsWithCls<P = unknown> = P & {
    className?: string | undefined;
};

type PropsWithChildren<T> = import('react').PropsWithChildren<T>;
export type PropsWithChildrenCls<P = unknown> = P & {
    children?: ReactNode | undefined;
    className?: string | undefined;
};