import { useMemo } from "react";

interface UseNativePropsOptions {
    excludeListeners?: boolean;
    excludeKeys?: string[];
    excludeDefaultKeys?: boolean;
}
const DEFAULT_EXCLUDE_KEYS = ['class','className', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;

export function useNativeProps<T extends Recordable>(props: T, options?: UseNativePropsOptions): T {
    const { excludeListeners = false, excludeKeys = [], excludeDefaultKeys = true } = options || {};
    const allExcludeKeys = excludeKeys.concat(excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : []);
    return useMemo(() => {
        return Object.keys(props)
            .filter((key) => !allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key)))
            .reduce((acc, key: keyof T) => {
                acc[key] = props[key]
                return acc;
            }, {} as T)
    }, [props])
}