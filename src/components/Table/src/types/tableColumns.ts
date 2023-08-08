import { TableColumnProps, TableColumnPropsWithKey } from "../props";

export interface GetColumnsParams {
    ignoreIndex?: boolean;
    ignoreAction?: boolean;
    sort?: boolean;
}
export interface UseColumnsMethods<T = any> {
    getViewColumns: () => TableColumnProps<T>[];
    getColumnsWithIndexAndAction: () => TableColumnProps<T>[];
    setColumns: (columnList: Partial<TableColumnProps<T>>[]) => void;
    resetColumns: () => void;
    setColumnsWithCache: (columnList: Partial<TableColumnProps<T>>[]) => void;
    getColumns: (opt?: GetColumnsParams) => TableColumnPropsWithKey<T>[];
    getCacheColumns: () => TableColumnPropsWithKey<T>[];
    getShowIndexColumn: () => boolean;
}
export type UseColumnsReturnType<T = any> = [
    TableColumnProps<T>[],
    UseColumnsMethods<T>
]