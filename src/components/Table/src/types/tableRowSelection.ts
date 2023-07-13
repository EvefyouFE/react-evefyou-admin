import React from "react";
import { BasicTableProps, TableRowSelectionProps } from "../props";
import { ExpandableConfig, GetRowKey, RowSelectMethod, SelectionSelectFn } from "antd/es/table/interface";

export type UseRowSelectionProps<T extends Recordable = any> = {
    props: BasicTableProps<T>,
    getRowKey: GetRowKey<T>;
}

export interface UseRowSelectionMethods<T extends Recordable = any> {
    getRowKey: GetRowKey<T>;
    handleRowSelectionChange: (selectedRowKeys: React.Key[], selectedRows: T[], info: {
        type: RowSelectMethod;
    }) => void;
    setSelectedRowsAndRowKeys: (keys?: React.Key[], rows?: T[]) => void;
    setSelectedRowKeys: (keys: React.Key[]) => void;
    setSelectedRows: (rows: T[]) => void;
    clearSelectedRowKeys: (keys: React.Key[]) => void;
    removeSelectedRowKey: (key: React.Key) => void;
    getSelectedRowKeys: () => React.Key[];
    getSelectedRows: () => T[];
    getDefaultRowSelection: () => TableRowSelectionProps<T>|undefined;
    getRowSelection: () => TableRowSelectionProps<T>|undefined;
    hideRowSelection: (flag?: boolean) => void;
    rowSelectionIsHidden: () => boolean;
}

export type UseRowSelectionReturnType<T extends Recordable = any> = [
    (BasicTableProps<T>['rowSelection'] | undefined),
    UseRowSelectionMethods<T>
]