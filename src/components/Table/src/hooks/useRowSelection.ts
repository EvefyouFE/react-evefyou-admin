import { genUUID } from "@/utils";
import { RowSelectMethod } from "antd/es/table/interface";
import { equals, is, omit } from "ramda";
import React, { Key, useCallback, useEffect, useMemo, useState } from "react";
import { ROW_KEYS } from "../constants";
import { UseRowSelectionProps, UseRowSelectionReturnType } from "../types";
import { BasicTableProps } from "../props";

export function useRowSelection<T extends Recordable>(props: BasicTableProps<T>): UseRowSelectionReturnType<T> {
    const {
        autoCreateKey = true,
        rowKey,
        rowSelection,
        childrenColumnName = 'children',
        onSelectionChange,
    } = props;
    const isAutoCreateKeyMemo = useMemo(() => autoCreateKey && !rowKey, [autoCreateKey, rowKey])
    const getRowKey = useCallback((record: T): React.Key => {
        if(!record) return genUUID()
        let autoRowKey: React.Key|undefined = undefined;
        isAutoCreateKeyMemo && ROW_KEYS.forEach(k => {
            autoRowKey ??= record[k] 
        })
        const rowKeyValue = autoRowKey
            ? autoRowKey
            : is(Function, rowKey)
                ? rowKey(record)
                : (rowKey && record[rowKey]) || genUUID()
        return rowKeyValue
    }, [isAutoCreateKeyMemo, rowKey])
    const [selectedRowKeysState, setSelectedRowKeysState] = useState<Key[]>([]);
    const [selectedRowsState, setSelectedRowsState] = useState<T[]>([]);
    const [hideRowSelectionState,setHideRowSelectionState] = useState(false)
    const rowSelectionMemo = useMemo(() => (!rowSelection ? undefined: {
        selectedRowKeys: selectedRowKeysState,
        onChange: handleRowSelectionChange,
        checkStrictly: rowSelection?.checkMode !== 'default',
        ...omit(['onChange', 'onSelect', 'checkStrictly'], rowSelection),
    }), [selectedRowKeysState, rowSelection, hideRowSelectionState, childrenColumnName])

    useEffect(() => {
        if (rowSelection?.selectedRowKeys) {
            setSelectedRowKeysState(rowSelection.selectedRowKeys)
        }
    }, [rowSelection?.selectedRowKeys])
    useEffect(() => {
        onSelectionChange?.(selectedRowKeysState, selectedRowsState)
    }, [selectedRowKeysState])

    function handleRowSelectionChange(selectedRowKeys: Key[], selectedRows: T[], info: {
        type: RowSelectMethod;
    }) {
        setSelectedRowsAndRowKeys(selectedRowKeys, selectedRows)
    }
    function setSelectedRowsAndRowKeys(keys?: Key[], rows?: T[]) {
        if (!keys && !rows) return;
        const checkMode = rowSelection?.checkMode ?? 'complex'
        if (checkMode === 'complex') {
            const rowsWithChild = rows && [rows[0]].reduce(function fn(acc,r) {
                acc.push(r)
                r?.[childrenColumnName]?.reduce(fn, acc)
                return acc
            }, [] as T[])
            const keysWithChild = rowsWithChild && rowsWithChild.map(r=>getRowKey(r))
            setSelectedRowKeysState(keysWithChild || [])
            setSelectedRowsState(rowsWithChild || [])
        } else {
            keys && setSelectedRowKeysState(keys)
            rows && setSelectedRowsState(rows)
        }
    }
    return useMemo(() => {
        function setSelectedRowKeys(keys: Key[]) {
            setSelectedRowsAndRowKeys(keys)
        }
        function setSelectedRows(rows: T[]) {
            setSelectedRowsAndRowKeys(undefined, rows)
        }
        function clearSelectedRowKeys() {
            setSelectedRowsState([])
            setSelectedRowKeysState([])
        }
        function removeSelectedRowKey(key: React.Key) {
            setSelectedRowsState(rs => {
                const idx = rs.findIndex((r) => getRowKey(r) === key)
                return rs.slice(idx, 1)
            })
            setSelectedRowKeysState(ks => {
                const idx = ks.findIndex((k) => k === key)
                return ks.slice(idx, 1)
            })
        }
        function getSelectedRowKeys() {
            return selectedRowKeysState;
        }
        function getSelectedRows() {
            return selectedRowsState;
        }
        function getDefaultRowSelection() {
            return rowSelection;
        }
        function getRowSelection() {
            return hideRowSelectionState ? undefined : rowSelectionMemo;
        }
        function hideRowSelection(flag: boolean = true) {
            return setHideRowSelectionState(flag);
        }
        function rowSelectionIsHidden() {
            return hideRowSelectionState;
        }
        return [
            rowSelectionMemo,
            {
                getRowKey,
                handleRowSelectionChange,
                setSelectedRowsAndRowKeys,
                setSelectedRowKeys,
                setSelectedRows,
                clearSelectedRowKeys,
                removeSelectedRowKey,
                getSelectedRowKeys,
                getSelectedRows,
                getDefaultRowSelection,
                getRowSelection,
                hideRowSelection,
                rowSelectionIsHidden,
            }
        ]
    }, [rowSelectionMemo, getRowKey, childrenColumnName]);
}