import { useEffect, useRef, useState } from "react";

export type UsePropsStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>]


export function usePropsState<T>(props: T): UsePropsStateReturnType<T> {
    const [propsState, setPropsState] = useState<T>(props);
    useEffect(() => {
        if(props && !Object.is(props, propsState)) {
            setPropsState(p => Object.assign({}, p, props))
        }
    }, [props])

    return [propsState, setPropsState]
}