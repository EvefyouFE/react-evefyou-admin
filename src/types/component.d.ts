export interface Option {
    key: string;
    title?: string;
    value?: string;
}

export interface SorterParam {
    order: import('antd/es/table/interface').SortOrder;
    field: string;
}

export type SortFn = (sortInfo: import('antd/es/table/interface').SorterResult) => SorterParam|{};
export type FilterFn = (data: Recordable) => Recordable;