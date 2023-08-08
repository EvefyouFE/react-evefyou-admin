
import { ColumnType, TableProps } from "antd/es/table";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import React from "react";
import { BasicFormProps } from "@/components/Form";
import { PermissionOptions } from "@/hooks/auth";
import { CellFormat, ColumnChangeParam, TableActionItem, TableChangeParams, TableSetting } from "./types/table";

export interface TableActionProps {
    divider?: boolean;
    items?: TableActionItem[];
    dropDownItems?: TableActionItem[];
    renderItem?: (item: TableActionItem) => React.ReactNode;
    renderDropdownHeader?: () => React.ReactNode;
}

export interface TableTitleProps {
    title?: React.ReactNode | ((option: { selectRows: Recordable[] }) => React.ReactNode);
    getSelectRows?: () => Recordable[];
    helpMessage?: string | string[];
}

export interface TableSettingProps {
    items?: React.ReactNode[];
}

export interface TableHeaderProps {
    renderTableTitle?: React.ReactNode;
    renderTableSetting?: React.ReactNode;
    renderHeaderTop?: React.ReactNode;
    renderToolbar?: React.ReactNode;
}

export interface TableRowSelectionProps<T = any> extends TableRowSelection<T> {
    checkMode?: 'strict' | 'default' | 'complex'
}
export type TableColumnProps<T = any> = ColumnsType<T>[number] & {
    type?: 'index' | 'action' | 'normal';
    children?: TableColumnProps<T>[];
    dataIndex?: string | number | readonly (string | number)[];
    // 业务控制，比如权限
    show?: boolean | ((column: TableColumnProps<T>) => boolean);
    auth?: PermissionOptions;
    format?: CellFormat<T>;
    edit?: boolean;
    editRow?: boolean;
    editable?: boolean;
    // 配置控制，先有字段(即show)才能配置hidden
    hidden?: boolean;
}
export type TableColumnPropsWithKey<T = any> = TableColumnProps<T> & {
    key: React.Key;
}

export type IndexColumnProps<T = any> = TableColumnProps<T>;

export interface BasicTableProps<T = any> extends Omit<TableProps<T>, 'rowSelection' | 'columns' | 'children'> {
    height?: number;
    columns?: TableColumnProps<T>[];
    rowSelection?: TableRowSelectionProps<T>;
    sortFn?: SortFn;
    filterFn?: FilterFn;
    clearSelectOnChange?: boolean;
    autoCreateKey?: boolean;
    isTreeTable?: boolean;
    ellipsis?: boolean;
    tableSetting?: TableSetting | false;
    headerProps?: TableHeaderProps;
    titleProps?: TableTitleProps;
    canResize?: boolean;
    canResizeParent?: boolean;
    searchProps?: BasicFormProps;
    indexColumnConfig?: ColumnType<T>;
    actionColumnConfig?: ColumnType<T>;
    showIndexColumn?: boolean;
    onReload?: () => void;
    onTableChange?: (params: TableChangeParams) => void;
    onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
    onColumnsChange?: (data: ColumnChangeParam[]) => void;
    searchConfig?: BasicFormProps;
    openSearchForm?: boolean;
    resizeHeightOffset?: number;
    maxHeight?: number;
    children?: ColumnType<T>['render'];

    headerRowHeight?: string;
}
