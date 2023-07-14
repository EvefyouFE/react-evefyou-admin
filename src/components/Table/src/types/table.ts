import { BasicTableProps, TableRowSelectionProps } from "../props";
import { UseDataSourceMethods } from "./tableDataSource";
import { UseColumnsMethods } from "./tableColumns";
import { UseRowSelectionMethods } from "./tableRowSelection";
import { UsePaginationMethods } from "./tablePagination";
import React from "react";
import { BaseInstance, HasPermissionOption, UsePropsMethods } from "@/hooks";
import { BasicFormInstance } from "@/components/Form/src/types/form";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { PopconfirmProps, TooltipProps } from "antd";
import { PopConfirmButtonProps } from "@/components/Button/src";

export interface UseTablePropsSetMethods<T extends Recordable = any> extends UsePropsMethods<BasicTableProps<T>> {
  setShowIndexColumn: (value?: boolean) => void;
  setRowSelection: (value?: TableRowSelectionProps<T>) => void;
  setSize: (value?: SizeType) => void;
  setHeight: (value?: number) => void;
}
export interface UseTablePropsMethods<T extends Recordable = any> extends UseTablePropsSetMethods<T> {
}
export type UseTablePropsReturnType<T extends Recordable = any> = [BasicTableProps<T>, UseTablePropsMethods<T>]

export interface TableHookMethods<T extends Recordable = any> extends UseTablePropsMethods<T>,
  UseDataSourceMethods, UseColumnsMethods, UseRowSelectionMethods, UsePaginationMethods {
}

export interface TableContextValue<T extends Recordable = any> extends Pick<TableHookMethods<T>,
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
  getElement?: () => HTMLDivElement|null;
}

export interface BasicTableInstance<T extends Recordable = any> extends BaseInstance<BasicTableProps<T>>, Pick<TableHookMethods<T>,
  'init' | 'setHeight' | 'getPagination' | 'getDataSource'
> {
  getElement?: () => HTMLDivElement|null;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullScreen?: boolean;
}
export interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}

export type TableChangeParams = Partial<Recordable & SearchState>

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;

export type ColumnChangeParam = {
  dataIndex: React.Key;
  fixed: boolean | 'left' | 'right' | undefined;
  hidden: boolean;
};

export interface TableActionItem extends PopConfirmButtonProps {
  key: React.Key;
  title?: string;
  icon?: React.ReactNode;
  popConfirmProps?: PopconfirmProps;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: HasPermissionOption;
  // 业务控制是否显示
  show?: boolean;
  tooltip?: string | TooltipProps;
  onClick?: React.MouseEventHandler<HTMLAnchorElement|HTMLButtonElement>;
}


export interface TableRenderComp<T extends Recordable = any> {
  tableHeader?: React.ReactNode;
}
export type UseRednersProps<T extends Recordable = any> = Partial<BasicTableProps<T>> & {
  tableRef: React.RefObject<HTMLDivElement>;
}

