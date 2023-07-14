import { useEffect, useMemo, useRef, useState } from "react";
import useUnmountEffect from "./useUnmountEffect";
import { usePropsState } from "./usePropsState";

export interface UsePropsSetMethods<T> {
    init: (props: T) => void;
    initDebug: (props: T, name?: string) => void;
    setProps: (props: T) => void;
    setPropsState: React.Dispatch<React.SetStateAction<T>>;
    resetProps: (props: T) => void;
}

export interface UsePropsMethods<T> extends UsePropsSetMethods<T> {
}

export type UsePropsReturnType<T> = [T, UsePropsMethods<T>]

export function useProps<T extends Recordable>(props: T): UsePropsReturnType<T> {
    const [propsState, setPropsState] = usePropsState<T>(props);

    const setMethods: UsePropsSetMethods<T> = useMemo(() => {
        function init(props: T) {
            setProps(props)
        }
        function initDebug(props: T, name?: string) {
            console.log('initDebug...name:[' + name + ']', props)
            setProps(props)
        }
        function setProps(props: T) {
            setPropsState(p => ({ ...p, ...props }))
        }
        function resetProps(props: T) {
            setPropsState(props)
        }
        return {
            init,
            initDebug,
            setProps,
            resetProps,
            setPropsState,
        }
    }, [])

    return [propsState, setMethods]
}