declare interface GetterFn<S = any, Args extends Array<any> = any, R = any> {
    (...args: [S, ...Args]): R;
}
declare interface SetterFn<Args extends Array<any> = any, R = any> {
    (...args: Args): R;
}
declare interface ActionFn<Args extends Array<any> = any, R = any> {
    (...args: Args): R | Promise<R>;
}
declare type Getters<S = any> = Recordable<GetterFn<S>>;
declare type Setters = Recordable<SetterFn>;
declare type Actions = Recordable<ActionFn>;
declare type GetterMethods<S = any, G extends Getters<S> = Getters<S>> = {
    [P in keyof G]: G extends Record<P, GetterFn<S, infer Args, infer R>> ? (...args: Args) => R : unknown;
};
declare type SetterMethods<S extends Setters> = {
    [P in keyof S]: S extends Record<P, SetterFn<infer Args, infer R>> ? SetterFn<Args, R> : unknown;
};
declare type ActionMethods<A extends Actions> = {
    [P in keyof A]: A extends Record<P, ActionFn<infer Args, infer R>> ? ActionFn<Args, R> : unknown;
};
declare type DefaultMethods<S = any, N extends string = 'state'> = {
    get: () => S;
    set: (state: S | ((prevState: S) => S)) => void;
    setProps: (prop: Partial<S>) => void;
    reset: () => void;
    deepSet: <KS extends readonly ExtractNestedKeys<S>[]>(
        keys: KS,
        value: NestedPropType<KS, S>
    ) => void;
    deepMerge: <KS extends readonly ExtractNestedKeys<S>[]>(
        keys: KS,
        value: Partial<NestedPropType<KS, S>>
    ) => void;
} & PropName<S, N>;

declare type ItemsDefaultMethods<
    S extends any[] = any[],
    N extends string = 'state',
> = DefaultMethods<S, N> & {
    add: (newItem: S extends Array<infer P> ? P : unknown) => void;
    remove: (item: S extends Array<infer P> ? P : unknown) => void;
    removes: (items: S extends Array<infer P> ? P : unknown[]) => void;
    clear: () => void;
};


declare interface BaseCallbackMethods<S> {
    set: React.Dispatch<React.SetStateAction<S>>;
}
declare interface CallbackMethods<S> extends BaseCallbackMethods<S> {
    [key: string]: number|string|Recordable;
}

declare interface CallbackState<
    S,
    CBM extends CallbackMethods<S>
> {
    (initialState?: S): [S, CBM]
};


declare interface StateConfig<
    S extends CallbackState<any, any> | any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S extends CallbackState<infer St, any> ? St : S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends CallbackMethods<any> = S extends CallbackState<any, infer M> ? M : CallbackMethods<any>
> {
    name: N;
    state: S;
    getters?: G & ThisType<PropName<S extends CallbackState<infer St, any> ? St : S, N>
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G>>;
    setters?: SE & ThisType<
        (S extends any[] ? ItemsDefaultMethods<S, N>
            : DefaultMethods<S extends CallbackState<infer St, any> ? St : S, N>)
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G> & SetterMethods<SE> & CBM
    >;
    actions?: A & ThisType<
        (S extends any[] ? ItemsDefaultMethods<S, N> : DefaultMethods<S, N>)
        & GetterMethods<S, G> & SetterMethods<SE> & ActionMethods<A> & CBM
    >;
}

declare interface RecoilStateConfig<
    S,
    RS extends CallbackState<MRecoilState<S>, any> | MRecoilState<S>,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends CallbackMethods<any> = RS extends CallbackState<any, infer M> ? M : CallbackMethods<any>
> {
    name: N;
    state: RS;
    defaultValue: S;
    getters?: G & ThisType<PropName<S extends CallbackState<infer St, any> ? St : S, N>
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G>>;
    setters?: SE & ThisType<
        (S extends any[] ? ItemsDefaultMethods<S, N>
            : DefaultMethods<S extends CallbackState<infer St, any> ? St : S, N>)
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G> & SetterMethods<SE> & CBM
    >;
    actions?: A & ThisType<
        (S extends any[] ? ItemsDefaultMethods<S, N> : DefaultMethods<S, N>)
        & GetterMethods<S, G> & SetterMethods<SE> & ActionMethods<A> & CBM
    >;
}

declare type DefineUseRecoilStateConfig<
    S,
    RS extends CallbackState<MRecoilState<S>, any> | MRecoilState<S>,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends CallbackMethods<any> = RS extends CallbackState<any, infer M> ? M : CallbackMethods<any>
> = RecoilStateConfig<S, RS, N, G, SE, A, CBM> | (() => RecoilStateConfig<S, RS, N, G, SE, A, CBM>);

declare type DefineUseStateConfig<
    State extends CallbackState<any, any> | any,
    N extends string = 'state',
    G extends Getters<any> = Getters<State extends CallbackState<infer St, any> ? St : State>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends CallbackMethods<any> = State extends CallbackState<any, infer M> ? M : CallbackMethods<any>
> = StateConfig<State, N, G, SE, A, CBM> | (() => StateConfig<State, N, G, SE, A, CBM>);

declare type StateMethods<
    S extends CallbackState<any, any> | any = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends CallbackMethods<any> = S extends CallbackState<any, infer M> ? M : CallbackMethods<any>
> = GetterMethods<S, G>
    & SetterMethods<SE>
    & ActionMethods<A>
    & (S extends any[] ? ItemsDefaultMethods<S, N> : DefaultMethods<S, N>)
    & CBM
    ;

declare type UseStateReturnType<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = any,
    SE extends Setters = any,
    A extends Actions = any,
    CBM extends CallbackMethods<any> = S extends CallbackState<any, infer M> ? M : CallbackMethods<any>
> = [S, StateMethods<S, N, G, SE, A, CBM>]

declare interface UseState<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends CallbackMethods<any> = S extends CallbackState<any, infer M> ? M : CallbackMethods<any>
> {
    (initialState?: S): UseStateReturnType<S, N, G, SE, A, CBM>
}


declare type SelectorDefaultMethods<State = any, N extends string = 'state'> = {
    refresh: () => void;
    get: () => State;
    set: (state: State| ((state: State) => State)) => void;
    setProps: (prop: Partial<State>) => void;
    deepSet: <KS extends readonly ExtractNestedKeys<State>[]>(
        keys: KS,
        value: NestedPropType<KS, State>
    ) => void;
    deepMerge: <KS extends readonly ExtractNestedKeys<State>[]>(
        keys: KS,
        value: Partial<NestedPropType<KS, State>>
    ) => void;
    reset: () => void;
    getState: MGetRecoilValue;
} & PropName<State, N>;

declare type SelectorItemsDefaultMethods<
    S extends any[] = any[],
    N extends string = 'state',
> = SelectorDefaultMethods<S, N> & {
    add: (newItem: S extends Array<infer P> ? P : unknown) => void;
    remove: (item: S extends Array<infer P> ? P : unknown) => void;
    removes: (items: (S extends Array<infer P> ? P : unknown)[]) => void;
    clear: () => void;
};

declare interface BaseSelectorStateConfig<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
> {
    name: N;
    state: S;
    getters?: G & ThisType<
        PropName<S, N>
        & GetterMethods<S, G>
        & Pick<SelectorDefaultMethods<S, N>, 'getState'>
    >;
    setters?: SE & ThisType<
        (S extends any[] ? SelectorItemsDefaultMethods<S, N>
            : SelectorDefaultMethods<S, N>)
        & GetterMethods<S, G>
        & SetterMethods<SE>
    >;
}

declare interface RecoilCallback<CBM = {}> {
    (): CBM
};

declare interface SelectorStateConfig<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CB extends RecoilCallback = RecoilCallback,
> extends BaseSelectorStateConfig<S, N, G, SE> {
    callback?: CB,
    actions?: A & ThisType<
        (S extends any[] ? SelectorItemsDefaultMethods<S, N> : SelectorDefaultMethods<S, N>)
        & GetterMethods<S, G>
        & SetterMethods<SE>
        & ActionMethods<A>
        & (CB extends RecoilCallback<infer CBM> ? CBM : {})
    >;
}

declare type SelectorStateMethods<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    CBM extends Recordable<any> = {}
> = GetterMethods<S, G>
    & SetterMethods<SE>
    & (S extends any[] ? SelectorItemsDefaultMethods<S, N> : SelectorDefaultMethods<S, N>)
    & CBM;

declare type SelectorStateAsyncMethods<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends Recordable<any> = {}
> = SelectorStateMethods<S, N, G, SE, CBM>
    & ActionMethods<A>
    ;

declare type UseSelectorStateReturnType<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends Recordable<any> = {}
> = [S, SelectorStateAsyncMethods<S, N, G, SE, A, CBM>]

declare interface UseSelectorState<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends Recordable<any> = {}
> {
    (initialState?: S): UseSelectorStateReturnType<S, N, G, SE, A, CBM>
}