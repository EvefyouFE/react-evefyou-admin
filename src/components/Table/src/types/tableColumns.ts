import { TableColumnProps, TableColumnPropsWithKey } from "../props";

export interface GetColumnsParams {
    ignoreIndex?: boolean;
    ignoreAction?: boolean;
    sort?: boolean;
}
export interface UseColumnsMethods<T extends Recordable = any> {
    getViewColumns: () => TableColumnProps<T>[];
    getColumnsWithIndexAndAction: () => TableColumnProps<T>[];
    setColumns: (columnList: Partial<TableColumnProps<T>>[]) => void;
    resetColumns: () => void;
    setColumnsWithCache: (columnList: Partial<TableColumnProps<T>>[]) => void;
    getColumns: (opt?: GetColumnsParams) => TableColumnPropsWithKey<T>[];
    getCacheColumns: () => TableColumnPropsWithKey<T>[];
    getShowIndexColumn: () => boolean;
}
export type UseColumnsReturnType<T extends Recordable = any> = [
    TableColumnProps<T>[],
    UseColumnsMethods<T>
]