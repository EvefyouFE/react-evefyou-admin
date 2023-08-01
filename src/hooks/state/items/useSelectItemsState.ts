import { KeyItem, defineUseState, useKeyItemsState, useKeysState } from "@/hooks";
import { drop, includes, is } from "ramda";
import React, { useCallback } from "react";

export interface SelectItem<T extends KeyItem<K> = any, K = T extends KeyItem<infer Key> ? Key : React.Key> {
    itemsState: T[];
    selectKeysState: K[];
}

export const useSelectItemsState = <
    T extends KeyItem<K>,
    K = T extends KeyItem<infer P> ? P : React.Key,
    N extends string = string,
>(
    initialState?: SelectItem<T, K>,
    name: N = 'selectItemsState' as N
) => useCallback(
    defineUseState({
        name,
        state: (initialState?: SelectItem<T, K>) => {
            const [itemsState, itemsStateMethods] = useKeyItemsState<T, K>(initialState?.itemsState)
            const [selectKeysState, selectKeysStateMethods] = useKeysState(initialState?.selectKeysState)
            const state = {
                itemsState,
                selectKeysState
            }
            const methods = {
                items: itemsStateMethods,
                selectKeys: selectKeysStateMethods,
                set: (s: SelectItem<T, K> | ((preS: SelectItem<T, K>) => SelectItem<T, K>)) => {
                    if (is(Function, s)) {
                        s(state)
                    } else {
                        itemsStateMethods.set(s.itemsState)
                        selectKeysStateMethods.set(s.selectKeysState)
                    }
                }
            }
            return [state, methods] as [SelectItem<T, K>, typeof methods]
        },
        getters: {
            getSelectedItems(state: SelectItem<T, K>) {
                return state.itemsState.filter(ims => includes(ims.key, state.selectKeysState))
            }
        },
        setters: {
            select(keys: K[]) {
                const newSelectKeys = keys.filter(k => !includes(k, this[name].selectKeysState))
                if (newSelectKeys.length) {
                    this.selectKeys.set(ks => [...ks, ...newSelectKeys])
                }
            },
            addAndSelect(item: T) {
                this.items.addByKey(item)
                this.select([item.key])
            },
            removeByKey(key: K) {
                const idx = this[name].itemsState.findIndex(({ key: k }) => k === key)
                idx !== -1 && this.items.set(ims => drop(idx, ims))
                const idxK = this[name].selectKeysState.findIndex(k => k === key)
                idxK !== -1 && this.selectKeys.set(ks => drop(idxK, ks))
            },
            clear() {
                this.items.clear()
                this.selectKeys.clear()
            },
        }
    }), [])(initialState)