import { GetRowKey, RowSelectMethod } from "antd/es/table/interface";
import React from "react";
import { BasicTableProps, TableRowSelectionProps } from "../props";

export type UseRowSelectionProps<T = any> = {
    props: BasicTableProps<T>,
    getRowKey: GetRowKey<T>;
}

export interface UseRowSelectionMethods<T = any> {
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
    getDefaultRowSelection: () => TableRowSelectionProps<T> | undefined;
    getRowSelection: () => TableRowSelectionProps<T> | undefined;
    hideRowSelection: (flag?: boolean) => void;
    rowSelectionIsHidden: () => boolean;
}

export type UseRowSelectionReturnType<T = any> = [
    (BasicTableProps<T>['rowSelection'] | undefined),
    UseRowSelectionMethods<T>
]