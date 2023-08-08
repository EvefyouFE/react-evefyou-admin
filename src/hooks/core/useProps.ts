import { useMemo } from "react";
import { usePropsState } from "./usePropsState";

export interface UsePropsSetMethods<T> {
    init: (props: T) => void;
    initDebug: (props: T, name?: string) => void;
    setProps: (props: T) => void;
    setPropsState: React.Dispatch<React.SetStateAction<T>>;
    resetProps: (props: T) => void;
}

export type UsePropsMethods<T> = UsePropsSetMethods<T>;

export type UsePropsReturnType<T> = [T, UsePropsMethods<T>]

export function useProps<T>(props: T): UsePropsReturnType<T> {
    const [propsState, setPropsState] = usePropsState<T>(props);

    const setMethods: UsePropsSetMethods<T> = useMemo(() => {
        function init(p: T) {
            setProps(p)
        }
        function initDebug(p: T, name?: string) {
            console.log(`initDebug...name:[${name ?? ''}]`, p)
            setProps(p)
        }
        function setProps(pr: T) {
            setPropsState(p => ({ ...p, ...pr }))
        }
        function resetProps(p: T) {
            setPropsState(p)
        }
        return {
            init,
            initDebug,
            setProps,
            resetProps,
            setPropsState,
        }
    }, [setPropsState])

    return [propsState, setMethods]
}