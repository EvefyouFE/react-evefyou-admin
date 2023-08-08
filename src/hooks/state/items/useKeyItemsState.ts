import React from "react";
import { includes } from "ramda";
import { defineUseState } from "..";

export interface KeyItem<K = React.Key> extends Recordable {
    key: K
}

export const defineKeyItemsState = <
    T extends KeyItem<K>,
    K = T extends KeyItem<infer P> ? P : React.Key,
    N extends string = 'state',
>(
    initialState: T[] = [] as T[],
    name: N = 'keyItemsState' as N,
) => defineUseState({
    name,
    useState: initialState,
    getters: {
        getByKey(state: T[], k: K) {
            return state.filter(item => item.key === k)[0]
        },
        getByKeys(state: T[], k: K) {
            return state.filter(item => includes(item.key, [k]))
        },
    },
    setters: {
        addByKey(item: T) {
            this.set(s => {
                const newItems = s.filter(({ key }: T) => key !== item.key)
                // 不存在数组里
                if (!newItems.length || newItems.length === s.length) {
                    return newItems.concat(item)
                }
                return s
            })
        },
        updateByKey(newItem: T) {
            this.set(s => s.map((item: T) => item.key === newItem.key ? newItem : item))
        },
        addOrUpdateByKey(item: T) {
            this.set(s => {
                const idx = s.findIndex(({ key }) => key === item.key)
                return idx !== -1 ? s.map((im, index) => index === idx ? item : im) : s.concat(item)
            })
        },
        removeByKey(k: K) {
            this.set(s => s.filter((item: T) => item.key !== k));
        },
        removeByKeys(keys: K[]) {
            this.set(s => s.filter((item: T) => !includes(item.key, keys)))
        },
    },
})

export const useKeyItemsState = defineKeyItemsState([] as KeyItem[])