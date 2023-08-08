declare interface GetterFn<S = any, Args extends Array<any> = any, R = any> {
    (...args: [S, ...Args]): R;
}
declare interface SetterFn<Args extends Array<any> = any, R = any> {
    (...args: Args): R;
}
declare interface ActionFn<Args extends Array<any> = any, R = any> {
    (...args: Args): R;
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
declare type DefaultSetMethods<S = any> = SetMethods<S> & {
    setProps: (prop: Partial<S>) => void;
    reset: () => void;
    deepSet: <KS extends readonly ExtractNestedKeys<S>[]>(
        keys: KS,
        any: NestedPropType<KS, S>
    ) => void;
    deepMerge: <KS extends readonly ExtractNestedKeys<S>[]>(
        keys: KS,
        any: Partial<NestedPropType<KS, S>>
    ) => void;
}

declare type ItemsDefaultSetMethods<
    T = any,
> = {
    add: (newItem: T) => void;
    remove: (item: T) => void;
    removes: (items: T[]) => void;
    clear: () => void;
};

declare type DefaultMethods<S = any, N extends string = 'state'> = DefaultSetMethods<S> & {
    get: () => S;
} & PropName<S, N>;

declare type ItemsDefaultMethods<
    T = any,
    N extends string = 'state'
> = DefaultMethods<T[], N> & ItemsDefaultSetMethods<T>;

declare interface SetMethods<S> {
    set: React.Dispatch<React.SetStateAction<S>>;
}

declare interface CallbackState<
    S,
    CBM extends SetMethods<S>
> {
    (initialState?: S): [S, CBM]
}

declare interface StateConfig<
    S extends CallbackState<any, any> | any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S extends CallbackState<infer St, any> ? St : S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends SetMethods<any> = S extends CallbackState<any, infer M> ? M : SetMethods<any>
> {
    name: N;
    useState: S;
    getters?: G & ThisType<PropName<S extends CallbackState<infer St, any> ? St : S, N>
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G>>;
    setters?: SE & ThisType<
        (S extends Array<infer T> ? ItemsDefaultSetMethods<T> & DefaultSetMethods<T[]>
            : DefaultSetMethods<S extends CallbackState<infer St, any> ? St : S>)
        & SetterMethods<SE> & CBM
    >;
    actions?: A & ThisType<
        (S extends Array<infer T> ? ItemsDefaultMethods<T, N>
            : DefaultMethods<S extends CallbackState<infer St, any> ? St : S, N>)
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G>
        & SetterMethods<SE> & ActionMethods<A> & CBM
    >;
}

declare interface RecoilStateConfig<
    S,
    RS extends CallbackState<MRecoilState<S>, any> | MRecoilState<S>,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends SetMethods<any> = RS extends CallbackState<any, infer M> ? M : SetMethods<any>
> {
    name: N;
    defaultValue: S;
    useState: RS;
    getters?: G & ThisType<PropName<S extends CallbackState<infer St, any> ? St : S, N>
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G>>;
    setters?: SE & ThisType<
        (S extends Array<infer T> ? ItemsDefaultSetMethods<T> & DefaultSetMethods<T[]>
            : DefaultSetMethods<S extends CallbackState<infer St, any> ? St : S>)
        & SetterMethods<SE> & CBM
    >;
    actions?: A & ThisType<
        (S extends Array<infer T> ? ItemsDefaultMethods<T, N>
            : DefaultMethods<S extends CallbackState<infer St, any> ? St : S, N>)
        & GetterMethods<S extends CallbackState<infer St, any> ? St : S, G>
        & SetterMethods<SE> & ActionMethods<A> & CBM
    >;
}

declare type StateMethods<
    S extends CallbackState<any, any> | any = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends SetMethods<any> = S extends CallbackState<any, infer M> ? M : SetMethods<any>
> = GetterMethods<S, G>
    & SetterMethods<SE>
    & ActionMethods<A>
    & (S extends Array<infer T> ? ItemsDefaultMethods<T, N>
        : DefaultMethods<S extends CallbackState<infer St, any> ? St : S, N>)
    & CBM
    ;

declare type UseStateReturnType<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = any,
    SE extends Setters = any,
    A extends Actions = any,
    CBM extends SetMethods<any> = S extends CallbackState<any, infer M> ? M : SetMethods<any>
> = [S, StateMethods<S, N, G, SE, A, CBM>]

declare interface UseState<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends SetMethods<any> = S extends CallbackState<any, infer M> ? M : SetMethods<any>
> {
    (initialState?: S): UseStateReturnType<S, N, G, SE, A, CBM>
}


declare type SelectorDefaultMethods<S = any, N extends string = 'state'> = {
    refresh: () => void;
    get: () => S;
    set: (state: S | ((state: S) => S)) => void;
    setProps: (prop: Partial<S>) => void;
    deepSet: <KS extends readonly ExtractNestedKeys<S>[]>(
        keys: KS,
        any: NestedPropType<KS, S>
    ) => void;
    deepMerge: <KS extends readonly ExtractNestedKeys<S>[]>(
        keys: KS,
        any: Partial<NestedPropType<KS, S>>
    ) => void;
    reset: () => void;
    getState: MGetRecoilValue;
} & PropName<S, N>;

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

declare interface RecoilCallback<CBM = object> {
    (): CBM
}

declare interface RecoilValueConfig<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CB extends RecoilCallback = RecoilCallback,
> extends BaseSelectorStateConfig<S, N, G, SE> {
    useFn?: CB,
    actions?: A & ThisType<
        (S extends any[] ? SelectorItemsDefaultMethods<S, N> : SelectorDefaultMethods<S, N>)
        & GetterMethods<S, G>
        & SetterMethods<SE>
        & ActionMethods<A>
        & (CB extends RecoilCallback<infer CBM> ? CBM : object)
    >;
}

declare type RecoilValueMethods<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    CBM extends Recordable<any> = object
> = GetterMethods<S, G>
    & SetterMethods<SE>
    & (S extends any[] ? SelectorItemsDefaultMethods<S, N> : SelectorDefaultMethods<S, N>)
    & CBM;

declare type RecoilValueAsyncMethods<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends Recordable<any> = object
> = RecoilValueMethods<S, N, G, SE, CBM>
    & ActionMethods<A>
    ;

declare type UseRecoilValueReturnType<
    S = any,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends Recordable<any> = object
> = [S, RecoilValueAsyncMethods<S, N, G, SE, A, CBM>]

declare interface UseRecoilValue<
    S,
    N extends string = 'state',
    G extends Getters<any> = Getters<S>,
    SE extends Setters = Setters,
    A extends Actions = Actions,
    CBM extends Recordable<any> = object
> {
    (initialState?: S): UseRecoilValueReturnType<S, N, G, SE, A, CBM>
}