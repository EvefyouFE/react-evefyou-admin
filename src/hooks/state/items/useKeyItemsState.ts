import React, { useCallback } from "react";
import { includes } from "ramda";
import { defineUseState } from "..";

export interface KeyItem<K = React.Key> extends Recordable {
    key: K
}

export const useKeyItemsState = <
    T extends KeyItem<K>,
    K = T extends KeyItem<infer P> ? P : React.Key,
    N extends string = string
>(
    initialState: T[] = [],
    name: N = 'keyItemsState' as N
) => useCallback(defineUseState({
    name,
    state: initialState,
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
            const newItems = this[name].filter(({key}: T) => key !== item.key)
            //不存在数组里
            if(!newItems.length || newItems.length === this[name].length) {
                this.set(newItems.concat(item))
            }
        },
        updateByKey(newItem: T) {
            const newPanes = this[name].map((item: T) => item.key === newItem.key ? newItem : item)
            this.set(newPanes)
        },
        removeByKey(k: K) {
            const newPanes = this[name].filter((item: T) => item.key !== k);
            this.set(newPanes);
        },
        removeByKeys(keys: K[]) {
            const leftItems = this[name].filter((item: T) => !includes(item.key, keys))
            this.set(leftItems)
        },
    }
}), [])(initialState)
