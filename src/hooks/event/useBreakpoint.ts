import { useMemo } from 'react';
import { ConfigurableWindow, defaultWindow } from '../configurable';
import { useMediaQuery } from './useMediaQuery';

export type Breakpoints<K extends string = string> = Record<K, number | string>;

export type UseBreakpointsReturn<K extends string = string> = {
    greater: (k: K) => boolean;
    greaterOrEqual: (k: K) => boolean;
    smaller(k: K): boolean;
    smallerOrEqual: (k: K) => boolean;
    between(a: K, b: K): boolean;
    isGreater(k: K): boolean;
    isGreaterOrEqual(k: K): boolean;
    isSmaller(k: K): boolean;
    isSmallerOrEqual(k: K): boolean;
    isInBetween(a: K, b: K): boolean;
    current(): string[];
} & Record<K, boolean>;

export function increaseWithUnit(target: string | number, delta: number): string | number {
    if (typeof target === 'number')
        return target + delta
    const value = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || ''
    const unit = target.slice(value.length)
    const result = (parseFloat(value) + delta)
    if (Number.isNaN(result))
        return target
    return `${result}${unit}`
}

export const useBreakpoint = <K extends string = string>(
    breakpoints: Breakpoints<K>,
    options: ConfigurableWindow = {}
) => {
    const { window = defaultWindow } = options;

    function getValue(k: K, delta?: number) {
        let v = breakpoints[k];

        if (delta != null) v = increaseWithUnit(v, delta);

        if (typeof v === 'number') return `${v}px`;

        return v;
    }

    function match(query: string): boolean {
        if (!window) return false;
        return window.matchMedia(query).matches;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const greaterOrEqual = (k: K) => useMediaQuery(`(min-width: ${getValue(k)})`, options);

    const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
        Object.defineProperty(shortcuts, k, {
            get: () => greaterOrEqual(k as K),
            enumerable: true,
            configurable: true,
        });
        return shortcuts;
    }, {} as Record<K, boolean>);

    return Object.assign(shortcutMethods, {
        greater(k: K) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useMediaQuery(`(min-width: ${getValue(k, 0.1)})`, options);
        },
        greaterOrEqual,
        smaller(k: K) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`, options);
        },
        smallerOrEqual(k: K) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useMediaQuery(`(max-width: ${getValue(k)})`, options);
        },
        between(a: K, b: K) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useMediaQuery(
                `(min-width: ${getValue(a)}) and (max-width: ${getValue(
                    b,
                    -0.1
                )})`,
                options
            );
        },
        isGreater(k: K) {
            return match(`(min-width: ${getValue(k, 0.1)})`);
        },
        isGreaterOrEqual(k: K) {
            return match(`(min-width: ${getValue(k)})`);
        },
        isSmaller(k: K) {
            return match(`(max-width: ${getValue(k, -0.1)})`);
        },
        isSmallerOrEqual(k: K) {
            return match(`(max-width: ${getValue(k)})`);
        },
        isInBetween(a: K, b: K) {
            return match(
                `(min-width: ${getValue(a)}) and (max-width: ${getValue(
                    b,
                    -0.1
                )})`
            );
        },
        current() {
            const points = Object.keys(breakpoints).map(
                (i) => [i, greaterOrEqual(i as K)] as const
            );

            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useMemo(
                () => points.filter(([, v]) => v).map(([k]) => k),
                [points]
            );
        },
    });
};
export default useBreakpoint;