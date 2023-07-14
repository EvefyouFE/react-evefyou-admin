import { useEffect, useImperativeHandle, useRef, useState } from "react";
import useUnmountEffect from "./useUnmountEffect";

export type UseCompInstanceReturnType<P, T extends BaseInstance<P>> = [React.MutableRefObject<T|null>, Partial<T>]

export interface BaseInstance<P> extends Object {
    init: (props: P) => void;
    initDebug?: (props: P, name?: string) => void;
}

export function useCompInstance<
    T extends BaseInstance<P>,
    P = T extends BaseInstance<infer Props> ? Props : unknown
>(props?: P, name?: string): UseCompInstanceReturnType<P,T> {
    const componentRef = useRef<T|null>(null)
    const [instance, setInstance] = useState<Partial<T>>({}) 

    useUnmountEffect(() => {
        if(componentRef.current != null) {
            componentRef.current = null
        }
    })

    useEffect(() => {
        if (props) {
            if(name) {
                componentRef.current?.initDebug?.(props, name)
            } else {
                componentRef.current?.init(props)
            }
        }
        if(instance === null && componentRef.current) {
            setInstance(componentRef.current)
        }
    }, [props])

    useEffect(() => {
        if(componentRef.current && !Object.is(componentRef.current, instance)) {
            setInstance(componentRef.current)
        }
    })

    return [componentRef, instance]
}