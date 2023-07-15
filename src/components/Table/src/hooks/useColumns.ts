import { usePermission, useUnmountEffect } from "@/hooks";
import { formatById } from "@/locales";
import { genUUID } from "@/utils";
import moment from "moment";
import { clone, is } from "ramda";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_ALIGN, ROW_KEYS } from "../constants";
import { BasicTableProps, TableColumnProps, TableColumnPropsWithKey } from "../props";
import { CellFormat, GetColumnsParams, UseColumnsReturnType } from "../types";
import { ColumnType } from "antd/es/table";


function handleItem<T extends Recordable>(item: TableColumnProps<T>, ellipsis?: boolean) {
    item.align ??= DEFAULT_ALIGN;
    item.key ??= is(String, item?.dataIndex) ? item?.dataIndex : genUUID();
    item.ellipsis ??= ellipsis;
    item?.children?.forEach((i) => handleItem(i, ellipsis))
    item.hidden ??= false
}

function handleIndexColumn<T extends Recordable = any>(
    columnsState: TableColumnProps<T>[],
    showIndexColumn: boolean = true,
    isTreeTable: boolean = false,
    indexColumn?: ColumnType<T>,
) {
    if (isTreeTable) return;
    const defaultProps: TableColumnProps<T> = {
        key: 'index',
        dataIndex: ROW_KEYS[1],
        title: formatById('components.table.index'),
        width: '5rem',
        align: 'center',
        type: 'index',
    }
    const indexCloumnIdx = columnsState.findIndex((c) => c.type === 'index')
    if (indexCloumnIdx !== -1) {
        showIndexColumn && columnsState.splice(indexCloumnIdx, 1, {
            ...defaultProps,
            ...indexColumn,
            ...columnsState[indexCloumnIdx],
        })
        !showIndexColumn && columnsState.splice(indexCloumnIdx, 1)
    } else {
        const isFixedLeft = columnsState.some((item) => item.fixed === 'left' || item.fixed);
        showIndexColumn && columnsState.unshift({
            fixed: isFixedLeft,
            ...defaultProps,
            ...indexColumn,
        })
    }
}
function handleActionColumn<T extends Recordable = any>(columnsState: TableColumnProps<T>[], children: ColumnType<T>['render'], actionColumn?: ColumnType<T>) {
    if (!actionColumn) return columnsState;

    const defaultProps: TableColumnProps<T> = {
        key: 'action',
        fixed: 'right',
        type: 'action',
        dataIndex: 'action',
        title: formatById('components.table.column.action'),
    }
    const actionCloumnIdx = columnsState.findIndex((column) => column.type === 'action');
    if (actionCloumnIdx !== -1) {
        columnsState.splice(actionCloumnIdx, 1, {
            ...defaultProps,
            ...actionColumn,
            ...columnsState[actionCloumnIdx],
            render: children,
        })
    } else {
        columnsState.push({
            ...defaultProps,
            ...actionColumn,
            render: children,
        })
    }
}

export function useColumns<T extends Recordable = any>(props: BasicTableProps<T>): UseColumnsReturnType<T> {
    const {
        columns,
        isTreeTable,
        indexColumnConfig,
        actionColumnConfig,
        showIndexColumn,
        ellipsis,
        children,
    } = props;
    const [columnsState, setColumnsState] = useState<TableColumnProps<T>[]>(columns ?? [])
    let cacheColumns = columns ?? []
    const isInited = useRef<boolean | null>(false);
    const [{ hasPermission }] = usePermission();

    useUnmountEffect(() => {
        isInited.current = null
    })
    useEffect(() => {
        if (columns?.length && !isInited.current) {
            const newColumns = clone(columns)
            setColumnsState(newColumns);
            cacheColumns = columns?.filter((c) => !c.type || c.type === 'normal')
            isInited.current = true
        }
    }, [columns])

    return useMemo(() => {
        function getColumnsWithIndexAndAction() {
            if (columnsState.length) {
                handleIndexColumn(columnsState, showIndexColumn, isTreeTable, indexColumnConfig)
                handleActionColumn(columnsState, children, actionColumnConfig)
                columnsState.forEach((item) => {
                    handleItem(
                        item,
                        ellipsis && !item.render,
                    );
                });
            }
            return columnsState;
        }
        function getViewColumns() {
            const columnsWithIndexAndAction = getColumnsWithIndexAndAction()
            const viewColumns = sortFixedColumn(columnsWithIndexAndAction)
            return viewColumns
                .filter((c) => (c.auth && hasPermission(c.auth)) || isShow(c))
                .map(function fn(c) {
                    c.children?.map(fn)
                    const { format, edit, type = 'normal' } = c;
                    const isCustomColumn = type === 'normal'
                    if (!c.render && format && !edit && isCustomColumn) {
                        c.render = (...args) => {
                            return formatCell(format, ...args)
                        }
                    }
                    return c
                })
        }
        function isShow({ show, ...rest }: TableColumnProps<T>) {
            return show ? is(Function, show) ? show(rest) : show : true;
        }
        function setColumns(columnList: Partial<TableColumnProps<T>>[]) {
            if (columnList.length <= 0) {
                setColumnsState([])
                return;
            }
            const columns = clone(columnList);
            setColumnsState(columns as TableColumnProps<T>[])
        }
        function resetColumns() {
            setColumnsState(cacheColumns)
        }
        function setColumnsWithCache(columnList: Partial<TableColumnProps<T>>[]) {
            if (columnList.length <= 0) {
                setColumnsState([])
                return;
            }
            const columns = clone(columnList);
            const columnIdxs: number[] = [];
            let sortChange = false;
            let newColumns: TableColumnProps<T>[] = cacheColumns.map((item, index) => {
                const newColIdx = columns.findIndex((c) => c.key === (item.key ?? item.dataIndex))
                const newCol = columns[newColIdx]
                columnIdxs.push(newColIdx)
                if (index !== newColIdx) {
                    sortChange = true;
                }
                return {
                    ...item,
                    fixed: newCol?.fixed ?? false,
                    hidden: newCol?.hidden ?? false,
                }
            });
            if (sortChange) {
                newColumns = columnIdxs?.map((idx) => newColumns[idx]);
            }
            setColumnsState(newColumns || [])
        }
        function getColumns(opt?: GetColumnsParams) {
            const { ignoreIndex, ignoreAction, sort } = opt || {};
            let columns = columnsState;
            if (ignoreIndex) {
                columns = columns.filter((item) => item.type !== 'index');
            }
            if (ignoreAction) {
                columns = columns.filter((item) => item.type !== 'action');
            }
            if (sort) {
                columns = sortFixedColumn(columns);
            }
            return columns as TableColumnPropsWithKey<T>[]
        }
        function getCacheColumns() {
            return cacheColumns as TableColumnPropsWithKey<T>[];
        }
        function getShowIndexColumn() {
            return showIndexColumn ?? true
        }
        return [columnsState, {
            getViewColumns,
            getColumnsWithIndexAndAction,
            setColumns,
            resetColumns,
            setColumnsWithCache,
            getColumns,
            getCacheColumns,
            getShowIndexColumn,
        }]
    }, [columnsState,
        isTreeTable,
        indexColumnConfig,
        actionColumnConfig,
        showIndexColumn,
        ellipsis,
        children,
    ]);
}

function sortFixedColumn<T>(columns: TableColumnProps<T>[]) {
    const fixedLeftColumns: TableColumnProps<T>[] = [];
    const fixedRightColumns: TableColumnProps<T>[] = [];
    const defColumns: TableColumnProps<T>[] = [];
    for (const column of columns) {
        if (column.hidden) {
            continue;
        }
        if (column.fixed === 'left') {
            fixedLeftColumns.push(column);
            continue;
        }
        if (column.fixed === 'right') {
            fixedRightColumns.push(column);
            continue;
        }
        defColumns.push(column);
    }
    return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns]
}

export function formatCell(format: CellFormat, text: string, record: Recordable, index: number) {
    if (!format) {
        return text;
    }
    if (is(Function, format)) {
        return format(text, record, index)
    }
    if (is(Map, format)) {
        return format.get(text);
    }
    try {
        const DATE_FORMAT_PREFIX = 'date|';
        if (is(String, format) && format.startsWith(DATE_FORMAT_PREFIX) && text) {
            const dateFormat = format.replace(DATE_FORMAT_PREFIX, '');

            if (!dateFormat) {
                return text;
            }
            return moment(text).format(dateFormat);
        }
    } catch (error) {
        console.error('单元格日期格式化失败：', format, text)
        return text;
    }
}