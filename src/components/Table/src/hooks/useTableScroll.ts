import { useMemo } from "react";
import { BasicTableProps } from "../props";
import { UseTableScrollHooksMethods, UseTableScrollReturnType } from "../types/tableScroll";

export function useTableScroll(
    props: BasicTableProps,
    methods: UseTableScrollHooksMethods
): UseTableScrollReturnType {
    const {
        height = 100,
        canResize = true,
        scroll,
    } = props;
    const {
        getRowSelection,
        getViewColumns,
        tableRef
    } = methods;
    const canResizeMemo = useMemo(() => canResize && !scroll?.y, [canResize, scroll])
    const scrollXMemo = useMemo(() => {
        let width = 0;
        const rowSelection = getRowSelection()
        if (rowSelection) {
            width += 60;
        }
        // TODO props ?? 0;
        const NORMAL_WIDTH = 150;

        const columns = getViewColumns()
        columns.forEach((item) => {
            width += Number.parseFloat(item.width as string) || 0;
        });
        const unsetWidthColumns = columns.filter((item) => !Reflect.has(item, 'width'));
        const len = unsetWidthColumns.length;
        if (len !== 0) {
            width += len * NORMAL_WIDTH;
        }

        const tableEl = tableRef.current
        const tableWidth = tableEl?.offsetWidth ?? 0;
        return tableWidth > width ? '100%' : width;
    }, [getRowSelection, getViewColumns, tableRef])
    const scrollMemo: BasicTableProps['scroll'] = useMemo(() => ({
        x: scrollXMemo,
        y: canResizeMemo ? height : undefined,
        scrollToFirstRowOnChange: false,
        ...scroll,
    }), [scrollXMemo, canResizeMemo, scroll, height])


    function canTableResize() {
        return canResizeMemo;
    }


    return [scrollMemo, {
        canTableResize,
    }]
}