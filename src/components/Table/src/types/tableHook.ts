import { SizeType } from "antd/es/config-provider/SizeContext";
import { BaseInstance, UsePropsMethods } from "react-evefyou-hooks";
import { UseDataSourceMethods } from "./tableDataSource";
import { UseColumnsMethods } from "./tableColumns";
import { UseRowSelectionMethods } from "./tableRowSelection";
import { BasicTableProps, TableRowSelectionProps } from "../props";
import { UsePaginationMethods } from "./tablePagination";


export interface UseTablePropsSetMethods<T = any> extends UsePropsMethods<BasicTableProps<T>> {
  setShowIndexColumn: (value?: boolean) => void;
  setRowSelection: (value?: TableRowSelectionProps<T>) => void;
  setSize: (value?: SizeType) => void;
  setHeight: (value?: number) => void;
}
export type UseTablePropsMethods<T = any> = UseTablePropsSetMethods<T>;
export type UseTablePropsReturnType<T = any> = [BasicTableProps<T>, UseTablePropsMethods<T>]

export interface TableHookMethods<T = any> extends UseTablePropsMethods<T>,
  UseDataSourceMethods, UseColumnsMethods, UseRowSelectionMethods, UsePaginationMethods {
}

export interface TableContextValue<T = any> extends Pick<TableHookMethods<T>,
  'setShowIndexColumn'
  | 'setSize'
  | 'setRowSelection'
  | 'getRowSelection'
  | 'getColumns'
  | 'getShowIndexColumn'
  | 'setColumnsWithCache'
  | 'getCacheColumns'
  | 'hideRowSelection'
  | 'rowSelectionIsHidden'
  | 'getDefaultRowSelection'
> {
  getElement?: () => HTMLDivElement | null;
}

export interface BasicTableInstance<T = any> extends BaseInstance<BasicTableProps<T>>, Pick<TableHookMethods<T>,
  'init' | 'setHeight' | 'getPagination' | 'getDataSource'
> {
  getElement?: () => HTMLDivElement | null;
}

export type UseRednersProps<T = any> = Partial<BasicTableProps<T>> & {
  tableRef: React.RefObject<HTMLDivElement>;
}