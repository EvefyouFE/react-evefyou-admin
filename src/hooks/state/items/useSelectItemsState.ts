
import { drop, includes } from "ramda";
import React from "react";
import { KeyItem, defineKeyItemsState } from "@/hooks/state/items/useKeyItemsState";
import { defineKeysState } from "@/hooks/state/items/useKeysState";
import { defineUseState } from "@/hooks/state";
import { useRelationState } from "@/hooks/core";

export interface SelectItem<T extends KeyItem<K> = any, K = T extends KeyItem<infer Key> ? Key : React.Key> {
    itemsState: T[];
    selectKeysState: K[];
}

export const defineSelectItemsState = <
    T extends KeyItem<K>,
    K = T extends KeyItem<infer P> ? P : React.Key,
    N extends string = string,
>(
    name: N = 'selectItemsState' as N
) => {
    const useKeyItemsState = defineKeyItemsState<T, K>()
    const useKeysState = defineKeysState<K>()
    return defineUseState({
        name,
        useState: (initialSt?: SelectItem<T, K>) => useRelationState({
            itemsState: useKeyItemsState(initialSt?.itemsState),
            selectKeysState: useKeysState(initialSt?.selectKeysState)
        }),
        getters: {
            getSelectedItems(state: SelectItem<T, K>) {
                return state.itemsState.filter(ims => includes(ims.key, state.selectKeysState))
            }
        },
        actions: {
            select(keys: K[]) {
                const newSelectKeys = keys.filter(k => !includes(k, this[name].selectKeysState))
                if (newSelectKeys.length) {
                    this.selectKeysState.set(ks => [...ks, ...newSelectKeys])
                }
            },
            addAndSelect(item: T) {
                this.itemsState.addByKey(item)
                this.select([item.key])
            },
            removeByKey(key: K) {
                const idx = this[name].itemsState.findIndex(({ key: k }) => k === key)
                idx !== -1 && this.itemsState.set(ims => drop(idx, ims))
                const idxK = this[name].selectKeysState.findIndex(k => k === key)
                idxK !== -1 && this.selectKeysState.set(ks => drop(idxK, ks))
            },
            clear() {
                this.itemsState.clear()
                this.selectKeysState.clear()
            },
        }
    })
}

export const useSelectItemsState = defineSelectItemsState<KeyItem>()