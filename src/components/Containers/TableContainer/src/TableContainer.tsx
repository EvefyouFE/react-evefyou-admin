import React, { ReactElement, Ref, useImperativeHandle, useMemo, useRef } from "react";
import classNames from "classnames";
import { TableContainerInstance } from "./typing";
import { useSearchForm, useTable, useTableContainerProps, useTableLayout } from "./hooks";
import { useDesign } from "@/hooks/design";
import { BasicForm } from "@/components/Form";
import { BasicTable } from "@/components/Table";
import { TableContainerProps } from "./props";
import { deepCompareObj } from "@/utils/object";

export const TableContainer = React.memo(React.forwardRef(<T = any>(
    props: TableContainerProps<T>,
    ref: React.ForwardedRef<TableContainerInstance<T>>
) => {
    const tableContainerRef = useRef<HTMLDivElement>(null)
    const [propsState, propsMethods] = useTableContainerProps<T>(props)
    const [formInstanceRef, formInstance] = useSearchForm(propsState)
    const [tableInstanceRef, tableInstance] = useTable<T>(propsState)

    const instance: TableContainerInstance = useMemo(() => ({
        init: propsMethods.init,
        getElement: () => tableContainerRef.current,
        formInstance,
        tableInstance,
    }), [propsMethods.init, formInstance, tableInstance])
    useImperativeHandle(ref, () => instance, [instance])

    useTableLayout(propsState, {
        instance,
        tableInstance,
    })

    const { prefixCls } = useDesign('table-container')
    const rootClsName = classNames(prefixCls, 'p-4')
    return (
        <div className={rootClsName} ref={tableContainerRef}>
            <BasicForm ref={formInstanceRef} />
            <BasicTable<T> ref={tableInstanceRef} />
        </div>
    )
}), deepCompareObj) as <T = any>(p: TableContainerProps<T> & { ref?: Ref<TableContainerInstance> }) => ReactElement;

