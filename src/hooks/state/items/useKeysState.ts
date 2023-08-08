import React from "react";
import { defineItemsState } from "./useItemsState";

export const defineKeysState = <K = React.Key, N extends string = 'keysState'>(
    initialState: K[] = [] as K[],
    name: N = 'keysState' as N,
) => defineItemsState<K, N>(initialState, name)

export const useKeysState = defineKeysState()
