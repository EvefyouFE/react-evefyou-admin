export const getEnumValue = (e: any, value: string): number => {
    return Number(Object.values(e).find((val) => val == value));
};

export const enum2Obj = <K extends string = string>(e: any): Record<K, number | string> => {
    let obj = {} as Record<keyof typeof e, number | string>;
    for (const key in e) {
        if (isNaN(Number(key))) {
            if (typeof e[key] === 'number') {
                obj[key] = e[key] as unknown as number;
            } else {
                obj[key] = e[key] as unknown as number;
            }
        }
    }
    return obj;
};

export type TreeNode<T extends any> = Record<keyof T, T[keyof T]> & {
    children?: T[];
};
export type ExcludeChildren<T> = Omit<T, 'children'>;

export type ConverHandler<S, T> = (value: S) => T;

export interface ConvertOptions<S, T> {
    handleKeys?: {
        sourceKeys?: (keyof S)[];
        targetKeys?: (keyof T)[];
        cloneKeys?: (keyof S & keyof T)[];
    };
    flatHandlers?: ConverHandler<S[keyof S], T[keyof T]>[]
}

/**
 * 转换树形数据，需配置
 * @param s 源数据
 * @param options 转换配置：转换的属性数组，包括同属性名赋值，不同属性名自定义处理函数赋值，
 * @returns 目标数据
 */
export function convertTreeNode<S extends TreeNode<S>, T extends TreeNode<T>>(
    s: S,
    options: ConvertOptions<ExcludeChildren<S>, ExcludeChildren<T>>
): T {
    const { handleKeys, flatHandlers } = options;
    const { sourceKeys, targetKeys, cloneKeys } = handleKeys || {};
    const t = {} as T;

    targetKeys && sourceKeys && targetKeys.length === sourceKeys.length
        && targetKeys.forEach((key, index) => {
            const flatHandleValue = flatHandlers && flatHandlers[index] && flatHandlers[index](s[sourceKeys[index]]);
            t[key] = (flatHandleValue ? flatHandleValue === 'undefined' ? undefined : flatHandleValue : s[sourceKeys[index]]) as unknown as T[keyof ExcludeChildren<T>];
        });
    cloneKeys?.forEach((key) => {
        t[key] = s[key] as unknown as T[keyof ExcludeChildren<S> & keyof ExcludeChildren<T>];
    });
    return {
        ...t,
        children: s.children && s.children.map((child) => convertTreeNode(child, { handleKeys, flatHandlers: flatHandlers }))
    };
}

export function convertTreeNodes<S extends TreeNode<S>, T extends TreeNode<T>>(
    s: S[],
    options: ConvertOptions<ExcludeChildren<S>, ExcludeChildren<T>>
): T[] {
    return s.map((node) => convertTreeNode(node, options));
}
