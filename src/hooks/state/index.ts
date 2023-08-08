import { curry, includes, is } from "ramda"
import React, { SetStateAction, useMemo, useState } from "react"
import { GetCallback, GetRecoilValue, RecoilState, RecoilValueReadOnly, SelectorCallbackInterface, atom, selector, useRecoilState, useRecoilValue } from "recoil"
import { deepMergeObjectByKeys, deepSetObjectByKeys } from "@/utils/object"

function getterMethods<
    S,
    G extends Getters<S>,
>(getters: G, state: S, context: any) {
    return Object.keys(getters).reduce((acc, k: keyof G) => {
        const getter = getters[k]
        const curriedGetter = curry(getter.bind(context))
        const res = curriedGetter(state) as
            G extends Record<keyof G, GetterFn<S, infer Args, infer R>>
            ? (...args: Args) => R
            : unknown
        acc[k] = is(Function, res)
            ? res
            : (() => res) as G extends Record<keyof G, GetterFn<S, infer Args, infer R>>
            ? (...args: Args) => R
            : unknown
        return acc;
    }, {} as GetterMethods<S, G>)
}
function setterMethods<
    SE extends Setters
>(actions: SE, context: any) {
    return Object.keys(actions).reduce((acc, k: keyof SE) => {
        const res = actions[k] as
            SE extends Record<keyof SE, SetterFn<infer Args, infer R>>
            ? SetterFn<Args, R>
            : unknown
        acc[k] = res.bind(context) as typeof res
        return acc;
    }, {} as SetterMethods<SE>)
}
function actionMethods<
    A extends Actions
>(actions: A, context: any) {
    return Object.keys(actions).reduce((acc, k: keyof A) => {
        const res = actions[k] as
            A extends Record<keyof A, ActionFn<infer Args, infer R>>
            ? ActionFn<Args, R>
            : unknown
        acc[k] = res.bind(context) as typeof res
        return acc;
    }, {} as ActionMethods<A>)
}

function defineUseCallbackState<
    S extends CallbackState<any, any> | any,
    CBM extends SetMethods<S extends CallbackState<infer St, any> ? St : S> =
    SetMethods<S extends CallbackState<infer St, any> ? St : S>
>(
    state: S
): (initialState?: S extends CallbackState<infer St, any> ? St : S)
        => [S extends CallbackState<infer St, any> ? St : S, CBM] {
    const useCallbackState = is(Function, state) ? state as
        CallbackState<S extends CallbackState<infer St, any> ? St : S, CBM> : useNativeState;

    function useNativeState(
        initialState?: S extends CallbackState<infer St, any> ? St : S
    ): [S extends CallbackState<infer St, any> ? St : S, CBM] {
        const [s, set] = useState(initialState ?? state as S extends CallbackState<infer St, any> ? St : S);
        return [s, { set } as CBM];
    }

    return useCallbackState;
}

function defineUseCallbackRecoilState<
    S,
    RS extends CallbackState<RecoilState<S>, SetMethods<any>> | RecoilState<S>,
    CBM extends SetMethods<any> = RS extends CallbackState<any, infer M> ? M : SetMethods<any>
>(
    state: RS,
): () => [S, CBM] {

    function useCallbackState(): [S, CBM] {
        const [stateAtom, methods] = is(Function, state) ? state() : [state, undefined]
        const [s, set] = useRecoilState(stateAtom);
        return [s, { set, ...methods } as CBM];
    }

    return useCallbackState;
}

function getDefaultSetMethods<
    S,
>(
    set: React.Dispatch<SetStateAction<S>>,
    initialState?: S
) {
    let defaultMethods = {
        set: (s) => set(s),
        setProps: (props) => set((s: S) => ({ ...s, ...props })),
        reset: () => initialState && set(initialState),
        deepSet: (keys, value) => set(s => {
            const state = s
            if (!is(Object, state)) return state;
            const newState = deepSetObjectByKeys(keys, value, state as Recordable)
            return newState as S
        }),
        deepMerge: (keys, value) => set(s => {
            const state = s
            if (!is(Object, state)) return state;
            const newState = deepMergeObjectByKeys(keys, value, state as Recordable)
            return newState as S
        }),
    } as (DefaultSetMethods<S>)
    if (is(Array, initialState)) {
        defaultMethods = Object.assign(defaultMethods, {
            add: (newItem) => {
                set(s => {
                    const state = s as S extends Array<infer T> ? T[] : any[]
                    state.push(newItem);
                    return [...state] as S
                })
            },
            remove: (item) => {
                set(s => {
                    const state = s as S extends Array<infer T> ? T[] : any[]
                    const newPanes = state.filter((i) => i !== item);
                    return newPanes as S
                });
            },
            removes: (items) => {
                set(s => {
                    const state = s as S extends Array<infer T> ? T[] : any[]
                    const leftItems = state.filter((item) => !includes(item, items))
                    return leftItems as S
                })
            },
            clear: () => {
                set([] as S)
            }
        } as ItemsDefaultMethods<S extends (infer T)[] ? T : any>
        )
    }
    return defaultMethods as S extends (infer T)[] ? ItemsDefaultMethods<T> : DefaultSetMethods<S>
}

function getDefaultMethods<
    S,
    N extends string = 'state',
    CBM extends SetMethods<S> = S extends CallbackState<S, infer M> ? M : SetMethods<S>
>(
    name: N,
    defineState: S,
    { set, ...rest }: CBM,
) {
    return {
        get: () => defineState,
        ...rest,
        [name]: defineState,
    } as (DefaultMethods<S, N> & CBM)
}

export function defineUseState<
    S extends CallbackState<any, any> | any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S extends CallbackState<infer St, any> ? St : S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends SetMethods<any> = S extends CallbackState<any, infer M> ? M : SetMethods<any>,
>(
    config: StateConfig<S, N, G, SE, A, CBM>,
): UseState<S extends CallbackState<infer St, any> ? St : S, N, G, SE, A, CBM> {
    const { getters = {} as G, actions = {} as A, setters = {} as SE, name, useState: state } = config
    const useCallbackState = defineUseCallbackState(state)

    function useDefineState(
        initialState?: S extends CallbackState<infer St, any> ? St : S
    ): UseStateReturnType<S extends CallbackState<infer St, any> ? St : S, N, G, SE, A, CBM> {
        const [defineState, callbackMethods] = useCallbackState(initialState)
        const { set } = callbackMethods
        const defaultSetMethods = useMemo(() => getDefaultSetMethods(set, initialState), [initialState, set])
        const defaultMethods = getDefaultMethods(name, defineState, callbackMethods)
        const methods = {} as StateMethods<S extends CallbackState<infer St, any> ? St : S, N, G, SE, A, CBM>
        Object.assign(methods, {
            ...defaultSetMethods,
            ...defaultMethods,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const settersMemo = useMemo(() => setterMethods(setters, methods), [defaultSetMethods])
        Object.assign(methods, {
            ...getterMethods(getters, defineState, methods),
            ...settersMemo,
        })
        actions && Object.assign(methods, actionMethods(actions, methods))
        return [defineState, methods]
    }

    return useDefineState
}

export function defineRecoilState<
    S,
    RS extends CallbackState<RecoilState<S>, any> | RecoilState<S>,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends SetMethods<any> = RS extends CallbackState<any, infer M> ? M : SetMethods<any>
>(
    config: RecoilStateConfig<S, RS, N, G, SE, A, CBM>,
): UseState<S, N, G, SE, A, CBM> {
    const { getters = {} as G, actions = {} as A, setters = {} as SE, name, useState: state, defaultValue } = config

    const useCallbackState = defineUseCallbackRecoilState<S, RS, CBM>(state)

    function useDefineState(): UseStateReturnType<S, N, G, SE, A, CBM> {
        const [defineState, callbackMethods] = useCallbackState()
        const { set } = callbackMethods
        const defaultSetMethods = getDefaultSetMethods(set, defaultValue)
        const methods = {} as StateMethods<S, N, G, SE, A, CBM>
        const defaultMethods = getDefaultMethods(name, defineState, callbackMethods)
        Object.assign(methods, {
            ...defaultSetMethods,
            ...defaultMethods,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const settersMemo = useMemo(() => setterMethods(setters, methods), [defaultSetMethods])
        Object.assign(methods, {
            ...getterMethods(getters, defineState, methods),
            ...settersMemo,
        })
        actions && Object.assign(methods, actionMethods(actions, methods))
        return [defineState, methods]
    }

    return useDefineState
}

function getSelectorDefaultMethods<
    S,
    N extends string
>(key: N, atm: RecoilState<S>, defineState: S, { get, getCallback }: {
    get: GetRecoilValue,
    getCallback: GetCallback,
}): SelectorDefaultMethods<S, N> {
    const defaultMethods = {
        getState: get,
        get: () => defineState,
        [key]: defineState,
        set: getCallback(set),
        setProps: getCallback(setProps(defineState)),
        reset: getCallback(reset),
        refresh: getCallback(refresh),
        deepSet: (keys, value) => {
            if (!is(Object, defineState) || is(Array, defineState) || is(Function, defineState)) return;
            const newState = deepSetObjectByKeys(keys, value, defineState as Recordable)
            getCallback(set)(newState as S)
        },
        deepMerge: (keys, value) => {
            if (!is(Object, defineState) || is(Array, defineState) || is(Function, defineState)) return;
            const newState = deepMergeObjectByKeys(keys, value, defineState as Recordable)
            getCallback(set)(newState as S)
        }
    } as SelectorDefaultMethods<S, N>

    function set({ set: s }: SelectorCallbackInterface) {
        return (value: S | ((state: S) => S)) => s(atm, value)
    }
    function setProps(state: S) {
        return ({ set: s }: SelectorCallbackInterface) =>
            (props: Partial<S>) =>
                s(atm, { ...state, ...props })
    }
    function reset({ reset: rs }: SelectorCallbackInterface) {
        return () => rs(atm)
    }
    function refresh({ refresh: rf }: SelectorCallbackInterface) {
        return () => rf(atm)
    }

    return defaultMethods
}

export function defineRecoilSelector<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
>(
    config: RecoilValueConfig<S, N, G, SE>,
    atm?: RecoilState<S>
): RecoilValueReadOnly<[S, RecoilValueMethods<S, N, G, SE>]> {
    const { getters = {} as G, setters = {} as SE, name: key, state } = config
    const stateAtom = atm ?? atom<S>({
        key: key.concat('Atom'),
        default: state
    });

    const stateSelector = selector<[
        S,
        RecoilValueMethods<S, N, G, SE>
    ]>({
        key: key.concat('Selector'),
        get: ({ get, getCallback }) => {
            const defineState = get(stateAtom)
            const methods = {
                ...getSelectorDefaultMethods(key, stateAtom, defineState, { get, getCallback }),
            } as RecoilValueMethods<S, N, G, SE>
            Object.assign(methods, {
                ...getterMethods(getters, defineState, methods),
                ...setterMethods(setters, methods),
            })
            return [defineState, methods]
        }
    });

    return stateSelector
}

export function defineRecoilValueAndSelector<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CB extends RecoilCallback = RecoilCallback,
>(
    config: RecoilValueConfig<S, N, G, SE, A, CB>,
    atm?: RecoilState<S>,
    sel?: RecoilValueReadOnly<[S, RecoilValueMethods<S, N, G, SE>]>
): [
        UseRecoilValue<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : object>,
        RecoilValueReadOnly<[S, RecoilValueMethods<S, N, G, SE>]>
    ] {
    const { actions = {} as A, useFn, ...rest } = config
    const stateAtom = atm ?? atom<S>({
        key: rest.name.concat('Atom'),
        default: rest.state
    });
    const stateSelector = sel ?? defineRecoilSelector(rest, stateAtom)

    function useDefineValue(): UseRecoilValueReturnType<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : object> {
        const [recoilState, recoilMethods] = useRecoilValue(stateSelector)
        const useMethods = useFn?.()
        const methods = {
            ...useMethods,
            ...recoilMethods
        } as RecoilValueAsyncMethods<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : object>
        actions && Object.assign(methods, actionMethods(actions, methods))
        return [recoilState, methods]
    }
    return [useDefineValue, stateSelector]
}

export function defineRecoilValue<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CB extends RecoilCallback = RecoilCallback,
>(
    config: RecoilValueConfig<S, N, G, SE, A, CB>,
    atm?: RecoilState<S>,
): UseRecoilValue<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : object> {
    return defineRecoilValueAndSelector(config, atm)[0]
}