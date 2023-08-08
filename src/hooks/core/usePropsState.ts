import { useEffect, useState } from "react";

export type UsePropsStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>]


export function usePropsState<T>(props: T): UsePropsStateReturnType<T> {
    const [propsState, setPropsState] = useState<T>(props);
    useEffect(() => {
        props && setPropsState(p => !Object.is(props, p) ? { ...p, ...props } : p)
    }, [props])

    return [propsState, setPropsState]
}