import { BasicForm, BasicFormProps } from "@/components/Form";
import { useDesign, useCompInstance, useLayoutSetting, useMountEffect, useProps } from "@/hooks";
import { genUUID, subtractAllWithUnit } from "@/utils";
import { Button, TablePaginationConfig } from "antd";
import Table, { ColumnType, TableProps } from "antd/es/table";
import { ColumnsType, FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import classNames from "classnames";
import { is, isEmpty, omit } from "ramda";
import React, { PropsWithChildren, ReactElement, Ref, createContext, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useColumns, useDataSource, usePagination, useRowSelection, useTableScroll } from "./hooks";
import { BasicTableProps, TableColumnProps } from "./props";
import { useRenders } from "./renders";
import { SearchState, TableChangeParams, TableContextValue, BasicTableInstance } from "./types";
import './index.less'
import { useTableProps } from "./hooks/useTableProps";

export const TableContext = createContext<TableContextValue | undefined>(undefined);
export const useTableContext = () => useContext(TableContext) as TableContextValue;

export const BasicTable = React.memo(React.forwardRef(<T extends Recordable = any>(
    props: BasicTableProps<T>,
    ref: React.ForwardedRef<BasicTableInstance<T>>
) => {
    const tableRef = useRef<HTMLDivElement>(null)
    const [propsState, propsMethods] = useTableProps(props)
    const [paginationState, paginationMethods] = usePagination(propsState)
    const [rowSelectionState, rowSelectionMethods] = useRowSelection(propsState)
    const [dataSourceState, dataSourceMethods] = useDataSource({
        props: propsState,
        getRowKey: rowSelectionMethods.getRowKey
    })
    const [columnsState, columnsMethods] = useColumns(propsState)
    const [scrollMemo] = useTableScroll(propsState, {
        tableRef,
        getRowSelection: rowSelectionMethods.getRowSelection,
        getViewColumns: columnsMethods.getViewColumns,
    })
    const [searchState, setSearchState] = useState<SearchState>({
        sortInfo: {},
        filterInfo: {},
    });
    
    const context: TableContextValue = useMemo(() => ({
        getElement: () => tableRef.current,
        setSize: propsMethods.setSize,
        setShowIndexColumn: propsMethods.setShowIndexColumn,
        setRowSelection: propsMethods.setRowSelection,
        getRowSelection: rowSelectionMethods.getRowSelection,
        getDefaultRowSelection: rowSelectionMethods.getDefaultRowSelection,
        hideRowSelection: rowSelectionMethods.hideRowSelection,
        rowSelectionIsHidden: rowSelectionMethods.rowSelectionIsHidden,
        getColumns: columnsMethods.getColumns,
        setColumnsWithCache: columnsMethods.setColumnsWithCache,
        getShowIndexColumn: columnsMethods.getShowIndexColumn,
        getCacheColumns: columnsMethods.getCacheColumns,
    }), [propsMethods, rowSelectionMethods, columnsMethods])

    const instance: BasicTableInstance = useMemo(() => ({
        init: propsMethods.init,
        getElement: () => tableRef.current,
        setHeight: propsMethods.setHeight,
        getDataSource: dataSourceMethods.getDataSource,
        getPagination: paginationMethods.getPagination,
    }), [propsMethods, dataSourceMethods, paginationMethods])
    useImperativeHandle(ref, () => instance, [instance])

    const {
        tableHeader: renderTableHeader
    } = useRenders({
        ...propsState,
        tableRef,
        dataSource: dataSourceState,
    })

    const {prefixCls} = useDesign('basic-table')
    const tableClsName = classNames(prefixCls, 'bg-white p-4')
    const { tableSetting, caption, title, searchConfig, ...restPropsState } = propsState
    const renderCaption = !title ? renderTableHeader : caption;
    const propsValue: TableProps<T> = {
        ...omit(['children','searchProps'],restPropsState),
        scroll: scrollMemo,
        onHeaderRow: handleHeaderRow,
        caption: renderCaption,
        title: !renderCaption ? () => renderTableHeader : title,
        columns: columnsMethods.getViewColumns(),
        rowSelection: rowSelectionMethods.getRowSelection(),
        rowKey: rowSelectionMethods.getRowKey,
        dataSource: dataSourceState,
        pagination: paginationState,
        onChange: handleTableChange,
        className: tableClsName,
    }

    function handleHeaderRow(data: readonly ColumnType<any>[], index?: number) {
        return {
            style: {
                height: props.headerRowHeight
            }
        }
    }
    function handleTableChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<any> | SorterResult<any>[],
        {
            currentDataSource,
            action,
        }: TableCurrentDataSource<any>) {
        // clearSelectOnChange && 
        paginationMethods.setPagination(pagination)

        const params: TableChangeParams = {};
        if (sorter && is(Function, props.sortFn)) {
            const sortInfo = props.sortFn(sorter);
            searchState.sortInfo = sortInfo;
            params.sortInfo = sortInfo;
        }
        if (filters && is(Function, props.filterFn)) {
            const filterInfo = props.filterFn(filters);
            searchState.filterInfo = filterInfo;
            params.filterInfo = filterInfo;
        }
        props.onTableChange?.(params)
    }
    return (
        <TableContext.Provider value={context}>
            <Table<T> ref={tableRef} {...propsValue} />
        </TableContext.Provider>
    )
})) as <T extends Recordable = any>(p: BasicTableProps<T> & { ref?: Ref<BasicTableInstance> }) => ReactElement;
