import { deepMergeObjectByKeys, deepSetObjectByKeys } from "@/utils/object"
import { curry, includes, is } from "ramda"
import { useMemo, useState } from "react"
import { GetCallback, GetRecoilValue, RecoilState, RecoilValueReadOnly, SelectorCallbackInterface, atom, selector, useRecoilState, useRecoilValue } from "recoil"


function getterMethods<
    State,
    G extends Getters<State>,
>(getters: G, state: State, context: any) {
    return Object.keys(getters).reduce((acc, k: keyof G) => {
        const getter = getters[k]
        const curriedGetter = curry(getter.bind(context)) as
            G extends Record<keyof G, GetterFn<State, infer Args, infer R>>
            ? GetterFn<State, Args, R>
            : unknown
        const res = curriedGetter(state)
        acc[k] = is(Function, res) ? res : () => res
        return acc;
    }, {} as GetterMethods<State, G>)
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
    CBM extends CallbackMethods<S extends CallbackState<infer St, any> ? St : S> =
    CallbackMethods<S extends CallbackState<infer St, any> ? St : S>
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
    RS extends CallbackState<RecoilState<S>, any> | RecoilState<S>,
    CBM extends CallbackMethods<any> = RS extends CallbackState<any, infer M> ? M : CallbackMethods<any>
>(
    state: RS,
): () => [S, CBM] {
    function useCallbackState(): [S, CBM] {
        const [stateAtom, methods] = is(Function, state) ? state() : [state, {}]
        const [s, set] = useRecoilState(stateAtom);
        return [s, { set, ...methods } as CBM];
    }

    return useCallbackState;
}

function getDefaultMethods<
    State,
    N extends string = 'state',
    CBM extends Recordable = Recordable
>(
    name: N,
    defineState: State,
    { set, ...rest }: CBM,
    initialState?: State
) {
    const defaultMethods = {
        get: () => defineState,
        set: (s) => set(s),
        setProps: (props) => set((s: any) => ({ ...s, ...props })),
        reset: () => initialState && set(initialState),
        deepSet: (keys, value) => {
            if (!is(Object, defineState)) return;
            const newState = deepSetObjectByKeys(keys, value, defineState as Recordable)
            set(newState as State)
        },
        deepMerge: (keys, value) => {
            if (!is(Object, defineState)) return;
            const newState = deepMergeObjectByKeys(keys, value, defineState as Recordable)
            set(newState as State)
        },
        [name]: defineState,
        ...rest
    } as (DefaultMethods<State, N> & CBM)
    if (is(Array, defineState)) {
        Object.assign(defaultMethods, {
            add: (newItem: State extends [infer T] ? T : unknown) => {
                defineState.push(newItem);
                set([...defineState] as State)
            },
            remove: (item: State extends [infer T] ? T : unknown) => {
                const newPanes = defineState.filter((i) => i !== item);
                set(newPanes as State);
            },
            removes: (items: [State extends [infer T] ? T : any]) => {
                const leftItems = defineState.filter((item) => !includes(item, items))
                set(leftItems as State)
            },
            clear: () => {
                set([] as State)
            }
        })
    }
    return defaultMethods;
}

export function defineUseState<
    S extends CallbackState<any, any> | any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S extends CallbackState<infer St, any> ? St : S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends CallbackMethods<any> = S extends CallbackState<any, infer M> ? M : CallbackMethods<any>
>(
    cfg: DefineUseStateConfig<S, N, G, SE, A, CBM>
): UseState<S extends CallbackState<infer St, any> ? St : S, N, G, SE, A, CBM> {
    const config = is(Function, cfg) ? cfg() : cfg
    const { getters = {} as G, actions = {} as A, setters = {} as SE, name, state } = config
    const useCallbackState = defineUseCallbackState(state)

    function useDefineState(
        initialState?: S extends CallbackState<infer St, any> ? St : S
    ): UseStateReturnType<S extends CallbackState<infer St, any> ? St : S, N, G, SE, A, CBM> {
        const [defineState, callbackMethods] = useCallbackState(initialState)
        const defaultMethods = getDefaultMethods(name, defineState, callbackMethods, initialState)
        let methods = {} as StateMethods<S extends CallbackState<infer St, any> ? St : S, N, G, SE, A, CBM>
        if (actions) {
            Object.assign(methods, {
                ...actionMethods(actions, methods),
            })
        }
        return useMemo(() => {
            Object.assign(methods, {
                ...defaultMethods,
            })
            Object.assign(methods, {
                ...getterMethods(getters, defineState, methods),
                ...setterMethods(setters, methods),
            })
            return [defineState, methods]
        }, [defineState])
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
    CBM extends CallbackMethods<any> = RS extends CallbackState<any, infer M> ? M : CallbackMethods<any>
>(
    cfg: DefineUseRecoilStateConfig<S, RS, N, G, SE, A, CBM>,
): UseState<S, N, G, SE, A, CBM> {
    const config = is(Function, cfg) ? cfg() : cfg
    const { getters = {} as G, actions = {} as A, setters = {} as SE, name, state, defaultValue } = config

    const useCallbackState = defineUseCallbackRecoilState<S,RS,CBM>(state)

    function useDefineState(): UseStateReturnType<S, N, G, SE, A, CBM> {
        const [defineState, callbackMethods] = useCallbackState()
        let methods = {} as StateMethods<S, N, G, SE, A, CBM>
        if (actions) {
            Object.assign(methods, actionMethods(actions, methods))
        }
        const defaultMethods = getDefaultMethods(name, defineState, callbackMethods, defaultValue)
        return useMemo(() => {
            Object.assign(methods, {
                ...defaultMethods,
            })
            Object.assign(methods, {
                ...getterMethods(getters, defineState, methods),
                ...setterMethods(setters, methods),
            })
            return [defineState, methods]
        }, [defineState])
    }

    return useDefineState
}

function getSelectorDefaultMethods<
    State,
    N extends string
>(key: N, atom: RecoilState<State>, defineState: State, { get, getCallback }: {
    get: GetRecoilValue,
    getCallback: GetCallback,
}): SelectorDefaultMethods<State, N> {
    let defaultMethods = {
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
            getCallback(set)(newState as State)
        },
        deepMerge: (keys, value) => {
            if (!is(Object, defineState) || is(Array, defineState) || is(Function, defineState)) return;
            const newState = deepMergeObjectByKeys(keys, value, defineState as Recordable)
            getCallback(set)(newState as State)
        }
    } as SelectorDefaultMethods<State, N>

    function set({ set: s }: SelectorCallbackInterface) {
        return (value: State|((state: State) => State)) => s(atom, value)
    }
    function setProps(state: State) {
        return ({ set: s }: SelectorCallbackInterface) =>
            (props: Partial<State>) =>
                s(atom, { ...state, ...props })
    }
    function reset({ reset: rs }: SelectorCallbackInterface) {
        return () => rs(atom)
    }
    function refresh({ refresh: rf }: SelectorCallbackInterface) {
        return () => rf(atom)
    }

    return defaultMethods
}

export function defineRecoilSelector<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
>(
    config: SelectorStateConfig<S, N, G, SE>,
    atm?: RecoilState<S>
): RecoilValueReadOnly<[S, SelectorStateMethods<S, N, G, SE>]> {
    const { getters = {} as G, setters = {} as SE, name: key, state } = config
    const stateAtom = atm ?? atom<S>({
        key: key.concat('Atom'),
        default: state
    });

    const stateSelector = selector<[
        S,
        SelectorStateMethods<S, N, G, SE>
    ]>({
        key: key.concat('Selector'),
        get: ({ get, getCallback }) => {
            const defineState = get(stateAtom)
            let methods = {
                ...getSelectorDefaultMethods(key, stateAtom, defineState, { get, getCallback }),
            } as SelectorStateMethods<S, N, G, SE>
            Object.assign(methods, {
                ...getterMethods(getters, defineState, methods),
                ...setterMethods(setters, methods),
            })
            return [defineState, methods]
        }
    });

    return stateSelector
}

export function defineRecoilStateAndSelector<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CB extends RecoilCallback = RecoilCallback,
>(
    config: SelectorStateConfig<S, N, G, SE, A, CB>,
    atm?: RecoilState<S>,
    selector?: RecoilValueReadOnly<[S, SelectorStateMethods<S, N, G, SE>]
    >
): [
        UseSelectorState<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : {}>,
        RecoilValueReadOnly<[S, SelectorStateMethods<S, N, G, SE>]>
    ] {
    const { actions = {} as A, use, ...rest } = config
    const stateAtom = atm ?? atom<S>({
        key: rest.name.concat('Atom'),
        default: rest.state
    });
    const stateSelector = selector ?? defineRecoilSelector(rest, stateAtom)

    function useDefineState(): UseSelectorStateReturnType<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : {}> {
        const stateValue = useRecoilValue(stateSelector)
        const [recoilState, recoilMethods] = useMemo(() => stateValue, [stateValue])
        const useMethods = use?.()
        let methods = {
            ...useMethods,
            ...recoilMethods
        } as SelectorStateAsyncMethods<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : {}>
        if (actions) {
            Object.assign(methods, actionMethods(actions, methods))
        }
        return [recoilState, methods]
    }
    return [useDefineState, stateSelector]
}

export function defineRecoilSelectorState<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CB extends RecoilCallback = RecoilCallback,
>(
    config: SelectorStateConfig<S, N, G, SE, A, CB>,
    atom?: RecoilState<S>,
): UseSelectorState<S, N, G, SE, A, CB extends RecoilCallback<infer CBM> ? CBM : {}> {
    return defineRecoilStateAndSelector(config, atom)[0]
}