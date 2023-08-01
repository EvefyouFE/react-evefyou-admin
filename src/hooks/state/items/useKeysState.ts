import React from "react";
import { useItemsState } from ".";

export const useKeysState = <K = React.Key, N extends string = string>(
    initialState?: K[],
    name : N = 'keysState' as N,
) => useItemsState<K,N>(initialState, name)
