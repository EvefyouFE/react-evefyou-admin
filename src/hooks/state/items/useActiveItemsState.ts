import { KeyItem, defineUseState, useKeyItemsState } from "@/hooks";
import { is } from "ramda";
import React, { useCallback, useState } from "react";

export interface ActiveItem<T extends KeyItem<K> = any, K = T extends KeyItem<infer Key> ? Key : React.Key> {
    itemsState: T[];
    activeKeyState?: K;
}

export const useActiveItemsState = <
    T extends KeyItem<K>,
    K = T extends KeyItem<infer P> ? P : React.Key,
    N extends string = string,
>(
    initialState?: ActiveItem<T, K>,
    name: N = 'activeItemsState' as N
) => useCallback(defineUseState({
    name,
    state: (initialState?: ActiveItem<T, K>) => {
        const [itemsState, itemsStateMethods] = useKeyItemsState<T, K>(initialState?.itemsState)
        const [activeKeyState, setActiveKeyState] = useState(initialState?.activeKeyState)
        const state: ActiveItem<T, K> = {
            itemsState,
            activeKeyState
        }
        const methods = {
            items: itemsStateMethods,
            activeKey: { setActiveKeyState },
            set: (s: ActiveItem<T, K> | ((preS: ActiveItem<T, K>) => ActiveItem<T, K>)) => {
                if (is(Function, s)) {
                    s(state)
                } else {
                    itemsStateMethods.set(s.itemsState)
                    setActiveKeyState(s.activeKeyState)
                }
            }
        }
        return [state, methods] as [ActiveItem<T, K>, typeof methods]
    },
    getters: {
        getActiveItem(state: ActiveItem<T, K>) {
            return state.itemsState.filter(ims => ims.key === state.activeKeyState)
        },
        getActiveKey(state: ActiveItem<T, K>) {
            return state.activeKeyState
        },
    },
    setters: {
        active(key: K) {
            this.activeKey.setActiveKeyState(key)
        },
        addAndActive(item: T) {
            this.items.addByKey(item)
            this.active(item.key)
        },
        removeByKey(key: K) {
            if (this[name].activeKeyState === key && this[name].itemsState.length > 1) {
                this[name].itemsState.some(({ key: k }, idx) => {
                    if (k === key) {
                        const newActiveItem = idx === 0
                            ? this[name].itemsState[idx + 1]
                            : this[name].itemsState[idx - 1]
                        this.activeKey.setActiveKeyState(newActiveItem.key)
                        return true;
                    }
                    return false;
                })
            }
            this.items.removeByKey(key)
        },
        clear() {
            this.items.clear();
            this.activeKey.setActiveKeyState(undefined)
        },
        removeLeft(key: K) {
            const idx = this[name].itemsState.findIndex(item => item.key === key)
            idx > 0 && this.items.set(ims => ims.slice(idx))
        },
        removeRight(key: K) {
            const idx = this[name].itemsState.findIndex(item => item.key === key)
            idx > 0 && this.items.set(ims => ims.slice(0, idx + 1))
        },
        removeOther(key: K) {
            const item = this[name].itemsState.find(item => item.key === key)
            if (this[name].itemsState.length !== 1 && item) {
                this.items.set([item])
            }
        }
    }
}), [])(initialState)
