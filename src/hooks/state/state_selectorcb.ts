// import { curry, includes, is } from "ramda"
// import { useMemo, useState } from "react"
// import { GetCallback, GetRecoilValue, RecoilState, RecoilValueReadOnly, SelectorCallbackInterface, atom, selector, useRecoilValue, useSetRecoilState } from "recoil"


// function getterMethods<
//     State,
//     G extends Getters<State>,
// >(getters: G, state: State) {
//     return Object.keys(getters).reduce((acc, k: keyof G) => {
//         const getter = getters[k]
//         const curriedGetter = curry(getter) as
//             G extends Record<keyof G, GettersFn<State, infer Args, infer R>>
//             ? GettersFn<State, Args, R>
//             : unknown
//         const res = curriedGetter(state)
//         acc[k] = is(Function, res) ? res : () => res
//         return acc;
//     }, {} as GetterMethods<G, State>)
// }
// function actionMethods<
//     A extends Actions
// >(actions: A, context: any) {
//     return Object.keys(actions).reduce((acc, k: keyof A) => {
//         const res = actions[k] as
//             A extends Record<keyof A, ActionsFn<infer Args, infer R>>
//             ? ActionsFn<Args, R>
//             : unknown
//         acc[k] = res.bind(context) as typeof res
//         return acc;
//     }, {} as ActionMethods<A>)
// }

// function deepMergeState<State>(
//     keys: readonly any[],
//     value: NestedPropType<typeof keys, State>,
//     state: State
// ) {
//     const newState = { ...state } as Recordable;
//     const props = [...keys]
//     let target = newState;
//     for (let i = 0; i < props.length - 1; i++) {
//         const prop = props[i];
//         target[prop] = { ...target[prop] };
//         target = target[prop];
//     }
//     target[props[props.length - 1]] = value;
//     return newState as State
// }

// function defineUseCallbackState<
//     State extends CallbackState<any, any>,
//     CBM extends CallbackMethods<any> = State extends CallbackState<any, infer M> ? M : CallbackMethods<State>,
// >(
//     state: State
// ): (initialState?: State extends CallbackState<infer St, any> ? St : State | undefined)
//         => [State extends CallbackState<infer St, any> ? St : State, CBM] {
//     const useCallbackState = is(Function, state) ? state as
//         CallbackState<State extends CallbackState<infer St, any> ? St : State, CBM> : useNativeState;

//     function useNativeState(
//         initialState?: State extends CallbackState<infer St, any> ? St : State
//     ): [State extends CallbackState<infer St, any> ? St : State, CBM] {
//         const [s, set] = useState(initialState ?? state as State extends CallbackState<infer St, any> ? St : State);
//         return [s, { set } as CBM];
//     }

//     return useCallbackState;
// }

// function getDefaultMethods<
//     State,
//     N extends string = 'state',
//     CBM extends CallbackMethods<any> = CallbackMethods<State>,
// >(
//     name: N,
//     defineState: State,
//     { set, ...rest }: CBM,
//     initialState?: State
// ) {
//     const defaultMethods = {
//         get: () => defineState,
//         set: (s: State) => set(s),
//         setProps: (props) => set((s: State) => ({ ...s, ...props })),
//         reset: () => initialState && set(initialState),
//         deepSet: (keys, value) => {
//             if (!is(Object, defineState)) return;
//             set(deepMergeState(keys, value, defineState) as State)
//         },
//         [name]: defineState,
//         ...rest
//     } as (DefaultMethods<N, State> & CBM)
//     if (is(Array, defineState)) {
//         Object.assign(defaultMethods, {
//             add: (newItem: State extends [infer T] ? T : unknown) => {
//                 defineState.push(newItem);
//                 set([...defineState] as (State extends [infer T] ? T : unknown)[])
//             },
//             remove: (item: State extends [infer T] ? T : unknown) => {
//                 const newPanes = defineState.filter((i) => i !== item);
//                 set(newPanes);
//             },
//             removes: (items: [State extends [infer T] ? T[] : unknown]) => {
//                 const leftItems = defineState.filter((item) => !includes(item, items))
//                 set(leftItems)
//             },
//             clear: () => {
//                 set([])
//             }
//         })
//     }
//     return defaultMethods;
// }

// export function defineUseState<
//     State extends CallbackState<any, any>,
//     A extends Actions,
//     N extends string = 'state',
//     G extends Getters<any> = Getters<State extends CallbackState<infer St, any> ? St : State>,
//     CBM extends CallbackMethods<any> = State extends CallbackState<any, infer M> ? M : CallbackMethods<State>,
// >(
//     cfg: DefineUseStateConfig<State, A, N, G, CBM>
// ): UseState<State extends CallbackState<infer St, any> ? St : State, N, G, A, CBM> {
//     const config = is(Function, cfg) ? cfg() : cfg
//     const { getters = {} as G, actions = {} as A, name, state } = config
//     const useCallbackState = defineUseCallbackState(state)

//     function useDefineState(
//         initialState?: State extends CallbackState<infer St, any> ? St : State
//     ): UseStateReturnType<State extends CallbackState<infer St, any> ? St : State, N, G, A, CBM> {
//         const [defineState, callbackMethods] = useCallbackState(initialState)
//         const defaultMethods = getDefaultMethods(name, defineState, callbackMethods, initialState)
//         return useMemo(() => {
//             let methods = {} as StateMethods<G, A, N, State extends CallbackState<infer St, any> ? St : State, CBM>
//             Object.assign(methods, {
//                 ...defaultMethods,
//                 ...getterMethods(getters, defineState),
//                 ...actionMethods(actions, methods),
//             })
//             return [defineState, methods]
//         }, [defineState])
//     }

//     return useDefineState
// }


// function recoilActionMethods<
//     State,
//     A extends Actions,
//     N extends string,
// >(
//     actions: A,
//     key: N,
//     state: State,
//     getCallback: GetCallback,
//     get: GetRecoilValue,
//     getRecoilDefaultMethods: (
//         key: N,
//         defineState: State,
//         cbi: SelectorCallbackInterface,
//         get: GetRecoilValue
//     ) => DefaultRecoilMethods<N, State>
// ) {
//     return Object.keys(actions).reduce((acc, k: keyof A) => {
//         const v = actions[k]
//         const res = getCallback((cbi: SelectorCallbackInterface) => {
//             const defaultMethods = getRecoilDefaultMethods(key, state, cbi, get)
//             return v.bind(defaultMethods)
//         }) as A extends Record<keyof A, ActionsFn<infer Args, infer R>>
//             ? ActionsFn<Args, R>
//             : unknown
//         acc[k] = res
//         return acc;
//     }, {} as ActionMethods<A>)
// }

// export function defineRecoilSelector<
//     State,
//     A extends Actions,
//     N extends string = 'state',
//     G extends Getters<any> = Getters<State extends CallbackState<infer St, any> ? St : State>,
// >(
//     config: RecoilSelectorConfig<State, A, N, G>,
//     stateAtom: RecoilState<State>
// ): RecoilValueReadOnly<[State, RecoilStateMethods<G, A, N, State>]> {
//     const { getters = {} as G, actions = {} as A, name: key } = config

//     const stateSelector = selector<[State, RecoilStateMethods<G, A, N, State>]>({
//         key: key.concat('Selector'),
//         get: ({ get, getCallback }) => {
//             const defineState = get(stateAtom)
//             let methods = {} as RecoilStateMethods<G, A, N, State>

//             Object.assign(methods, {
//                 ...getterMethods(getters, defineState),
//                 ...recoilActionMethods(actions, key, defineState, getCallback, get, getRecoilDefaultMethods),
//             })

//             return [defineState, methods]
//         }
//     });

//     function getRecoilDefaultMethods<
//         N extends string,
//     >(
//         key: N,
//         defineState: State,
//         cbi: SelectorCallbackInterface,
//         get: GetRecoilValue
//     ) {
//         return {
//             getState: get,
//             get: () => defineState,
//             set: setFn(cbi),
//             reset: resetFn(cbi),
//             refresh: refreshFn(cbi),
//             setProps: setPropsFn(cbi),
//             deepSet: deepSetFn(cbi),
//             [key]: defineState as DefaultRecoilMethods<N, State>[N]
//         } as DefaultRecoilMethods<N, State>
//     }
//     function setFn({ set, }: SelectorCallbackInterface) {
//         return (value: State) => set(stateAtom, value)
//     }
//     function resetFn({ reset }: SelectorCallbackInterface) {
//         return () => reset(stateAtom)
//     }
//     function refreshFn({ refresh }: SelectorCallbackInterface) {
//         return () => refresh(stateAtom)
//     }
//     function setPropsFn({ set, }: SelectorCallbackInterface) {
//         return (props: Partial<State>) => set(stateAtom, s => ({ ...s, ...props }))
//     }
//     function deepSetFn({ set }: SelectorCallbackInterface) {
//         return <KS extends readonly ExtractNestedKeys<State>[]>(
//             keys: KS,
//             value: NestedPropType<KS, State>
//         ) => set(stateAtom, s => deepMergeState(keys, value, s))
//     }

//     return stateSelector
// }

// export function defineRecoilState<
//     State,
//     A extends Actions,
//     AsyncA extends Actions,
//     N extends string = 'state',
//     G extends Getters<any> = Getters<State extends CallbackState<infer St, any> ? St : State>,
// >(
//     config: RecoilStateConfig<State, A, AsyncA, N, G>,
//     selector?: RecoilValueReadOnly<[State, RecoilStateMethods<G, A, N, State>]>
// ): [UseRecoilState<State, N, G, A, AsyncA>, RecoilValueReadOnly<[State, RecoilStateMethods<G, A, N, State>]>] {
//     const { asyncActions, name: key, state } = config
//     const stateAtom = atom<State>({
//         key: key.concat('Atom'),
//         default: state
//     });

//     const stateSelector = selector ?? defineRecoilSelector(config, stateAtom)

//     function useDefineState(): UseRecoilStateReturnType<State, N, G, A, AsyncA> {
//         const [recoilState, recoilMethods] = useRecoilValue(stateSelector)
//         const setState = useSetRecoilState(stateAtom)
//         let methods = {
//             ...recoilMethods,
//             ...getDefaultMethods(key, recoilState, {set: setState}, state),
//             set: setState
//         } as RecoilStateMethods<G, A, N, State>
//         if (asyncActions) {
//             const actions = asyncActions(recoilState)
//             Object.assign(methods, actionMethods(actions, methods))
//         }
//         return [recoilState, methods]
//     }
//     return [useDefineState, stateSelector]
// }
