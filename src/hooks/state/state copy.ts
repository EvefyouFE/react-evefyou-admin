// import { curry, includes, is } from "ramda"
// import { useMemo, useState } from "react"
// import { RecoilValueReadOnly, SelectorCallbackInterface, atom, selector } from "recoil"


// function getterMethods<
//     State,
//     G extends Getters<State>,
// >(getters: G, state: State, context: any) {
//     return Object.keys(getters).reduce((acc, k: keyof G) => {
//         const getter = getters[k]
//         const curriedGetter = curry(getter) as
//             G extends Record<keyof G, GetterFn<State, infer Args, infer R>>
//             ? GetterFn<State, Args, R>
//             : unknown
//         const res = curriedGetter(state)
//         const fn = is(Function, res) ? res : () => res
//         acc[k] = fn.bind(context) as typeof res
//         return acc;
//     }, {} as GetterMethods<G, State>)
// }
// function actionMethods<
//     A extends Actions
// >(actions: A, context: any) {
//     return Object.keys(actions).reduce((acc, k: keyof A) => {
//         const res = actions[k] as
//             A extends Record<keyof A, ActionFn<infer Args, infer R>>
//             ? ActionFn<Args, R>
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

// export function defineUseState<
//     State,
//     N extends string,
//     G extends Getters<State>,
//     A extends Actions,
// >(cfg: DefineUseStateConfig<N, State, G, A>): UseState<State, N, G, A> {
//     const config = is(Function, cfg) ? cfg() : cfg
//     const { getters = {} as G, actions = {} as A, name: key, state } = config

//     function useDefineState(initialState?: State): UseStateReturnType<State, N, G, A> {
//         const [defineState, setDefineState] = useState(initialState ?? state)

//         const defaultMethods = {
//             get: () => defineState,
//             set: (s: State | ((prevState: State) => State)) => setDefineState(s),
//             setProps: (props) => setDefineState(s => ({ ...s, ...props })),
//             reset: () => setDefineState(initialState ?? state),
//             deepSet: (keys, value) => {
//                 if (!is(Object, defineState)) return;
//                 setDefineState(deepMergeState(keys, value, defineState) as State)
//             }
//         } as DefaultMethods<N, State>
//         defaultMethods[key] = defineState as DefaultMethods<N, State>[N]

//         return useMemo(() => {
//             let methods = {} as StateMethods<G, A, N, State>
//             Object.assign(methods, {
//                 ...defaultMethods,
//                 ...getterMethods(getters, defineState, methods),
//                 ...actionMethods(actions, methods),
//             })
//             return [defineState, methods]
//         }, [defineState])
//     }


//     return useDefineState
// }

// export function defineUseItemsState<
//     State extends Array<any>,
//     G extends Getters<State>,
//     A extends Actions,
//     N extends string,
//     T = State extends Array<infer P> ? P : unknown
// >(cfg: DefineUseItemsStateConfig<N, State, G, A>): UseState<State, N, G, A, ItemsDefaultMethods<N, State>> {
//     const config = is(Function, cfg) ? cfg() : cfg
//     const { getters = {} as G, actions = {} as A, name, state } = config

//     function useDefineState(initialState?: State): UseStateReturnType<State, N, G, A, ItemsDefaultMethods<N, State>> {
//         const [defineState, setDefineState] = useState<State>(initialState ?? state)

//         const defaultMethods = {
//             get: () => defineState,
//             set: (s: State | ((prevState: State) => State)) => setDefineState(s),
//             setProps: (props) => setDefineState(s => ({ ...s, ...props })),
//             reset: () => setDefineState(initialState ?? state),
//             deepSet: (keys, value) => {
//                 if (!is(Object, defineState)) return;
//                 setDefineState(deepMergeState(keys, value, defineState) as State)
//             },
//             add: (newItem: T) => {
//                 defineState.push(newItem);
//                 setDefineState([...defineState] as State)
//             },
//             remove: (item: T) => {
//                 const newPanes = defineState.filter((i) => i !== item) as State;
//                 setDefineState(newPanes);
//             },
//             removes: (items: T[]) => {
//                 const leftItems = defineState.filter(item => !includes(item, items)) as State
//                 setDefineState(leftItems)
//             },
//             clear: () => {
//                 setDefineState([] as any[] as State)
//             }
//         } as ItemsDefaultMethods<N, State>
//         defaultMethods[name] = defineState as ItemsDefaultMethods<N, State>[N]

//         return useMemo(() => {
//             let methods = {} as StateMethods<G, A, N, State, ItemsDefaultMethods<N, State>>
//             Object.assign(methods, {
//                 ...defaultMethods,
//                 ...getterMethods(getters, defineState, methods),
//                 ...actionMethods(actions, methods),
//             })
//             return [defineState, methods]
//         }, [defineState])
//     }


//     return useDefineState
// }

// export function defineUseCallbackState<
//     State,
//     G extends Getters<State>,
//     A extends Actions,
//     CBM extends CallbackMethods<State>,
//     N extends string = 'state',
// >(cfg: DefineUseStateConfig<N, State, G, A, CBM>): UseState<State, N, G, A, CBM> {
//     const config = is(Function, cfg) ? cfg() : cfg
//     const { getters = {} as G, actions = {} as A, name, state } = config

//     const getState = is(Function, state) ? state : (initialState?: State): [State,CBM] => {
//         const [s,set] = useState(initialState ?? state)
//         return [s,{set}]
//     }

//     function useDefineState(initialState?: State): UseStateReturnType<State, N, G, A, CBM> {
//         const [defineState, callbackMethods] = getState(initialState)
//         const { set, ...rest } = callbackMethods

//         const defaultMethods = {
//             get: () => defineState,
//             set: (s: State | ((prevState: State) => State)) => set(s),
//             setProps: (props) => set(s => ({ ...s, ...props })),
//             reset: () => initialState && set(initialState),
//             deepSet: (keys, value) => {
//                 if (!is(Object, defineState)) return;
//                 set(deepMergeState(keys, value, defineState) as State)
//             },
//             ...rest
//         } as (DefaultMethods<N, State> & CBM)
//         defaultMethods[name] = defineState as (DefaultMethods<N, State> & CBM)[N]

//         return useMemo(() => {
//             let methods = {} as StateMethods<G, A, N, State, CBM>
//             Object.assign(methods, {
//                 ...defaultMethods,
//                 ...getterMethods(getters, defineState, methods),
//                 ...actionMethods(actions, methods),
//             })
//             return [defineState, methods]
//         }, [defineState])
//     }

//     return useDefineState
// }

// export function defineRecoilSelector<
//     State,
//     G extends Getters<State>,
//     A extends Actions,
//     N extends string
// >(config: SelectorStateConfig<N, State, G, A>): RecoilValueReadOnly<[State, SelectorStateMethods<G, A, N, State>]> {
//     const { getters = {} as G, actions = {} as A, name: key, state } = config
//     const stateAtom = atom<State>({
//         key: key.concat('Atom'),
//         default: state
//     });
//     let defaultMethods = {} as SelectorDefaultMethods<N, State>

//     const stateSelector = selector<[State, SelectorStateMethods<G, A, N, State>]>({
//         key: key.concat('Selector'),
//         get: ({ get, getCallback }) => {
//             const defineState = get(stateAtom)
//             defaultMethods.getState = get
//             defaultMethods.get = () => defineState
//             defaultMethods[key] = defineState as SelectorDefaultMethods<N, State>[N]
//             defaultMethods.set = getCallback(set)
//             defaultMethods.setProps = getCallback(setProps(defineState))
//             defaultMethods.reset = getCallback(reset)
//             defaultMethods.refresh = getCallback(refresh)
//             defaultMethods.deepSet = (keys, value) => {
//                 if (!is(Object, defineState)) return;
//                 getCallback(set)(deepMergeState(keys, value, defineState) as State)
//             }

//             let methods = {
//                 ...defaultMethods,
//             } as SelectorStateMethods<G, A, N, State>

//             Object.assign(methods, {
//                 ...getterMethods(getters, defineState, methods),
//                 ...actionMethods(actions, methods),
//             })
//             return [defineState, methods]
//         }
//     });

//     function set({ set: s }: SelectorCallbackInterface) {
//         return (value: State) => s(stateAtom, value)
//     }
//     function setProps(state: State) {
//         return ({ set: s }: SelectorCallbackInterface) =>
//             (props: Partial<State>) =>
//                 s(stateAtom, { ...state, ...props })
//     }
//     function reset({ reset: rs }: SelectorCallbackInterface) {
//         return () => rs(stateAtom)
//     }
//     function refresh({ refresh: rf }: SelectorCallbackInterface) {
//         return () => rf(stateAtom)
//     }

//     return stateSelector
// }
