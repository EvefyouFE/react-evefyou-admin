import { useDebounceFn, useThrottleFn } from 'ahooks';
import { useEffect, useRef } from 'react';

export type RemoveEventFn = () => void;
export interface BuildListenerParams {
    listener: EventListener;
    isDebounce?: boolean;
    wait?: number;
}
export interface UseEventListenerParams {
    el?: Element | Window | any;
    type: string;
    listener: EventListener;
    options?: boolean | AddEventListenerOptions;
    isDebounce?: boolean;
    wait?: number;
    autoRemove: boolean;
}
export type BuildListenerFn = (params: BuildListenerParams) => EventListener;
export type CleanUpFn = () => void;
export type EventFn = (params: UseEventListenerParams) => CleanUpFn;
export type CreateFn = (
    buildListener: BuildListenerFn,
    addEvent: EventFn
) => CleanUpFn | void;
export type Deps = Array<Partial<UseEventListenerParams>>;
/* eslint-disable */
export function useEventListener({
    el = window,
    type,
    listener,
    options,
    isDebounce = true,
    wait = 0,
    autoRemove = true,
}: UseEventListenerParams) {
    const cleanup = useRef<Function | null>(null);

    const effect = () => {
        const buildListener = wait
            ? isDebounce
                ? useDebounceFn(listener, { wait }).run
                : useThrottleFn(listener, { wait }).run
            : listener;

        cleanup.current = () =>
            el.removeEventListener(type, buildListener, options);

        const element = el instanceof Element ? el : el.current;
        element && element.addEventListener(type, buildListener, options);
        return () => autoRemove && cleanup.current && cleanup.current() && (cleanup.current = null)
    };

    useEffect(effect, [el, type, listener, options, isDebounce, wait]);

    return cleanup;
}
export default useEventListener;