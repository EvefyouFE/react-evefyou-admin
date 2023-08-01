

import { useCallback } from "react";
import { defineUseState } from "..";

export const useItemsState = <T, N extends string>(
    initialState: T[] = [],
    name: N = 'itemsState' as N
) => useCallback(defineUseState({
    name,
    state: initialState,
}), [])(initialState)
