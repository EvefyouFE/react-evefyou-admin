import { defineUseState } from "..";

export const defineItemsState = <T = any, N extends string = 'itemsState'>(
    initialState: T[] = [] as T[],
    name: N = 'itemsState' as N
) => defineUseState({
    name,
    useState: initialState,
})

export const useItemsState = defineItemsState()