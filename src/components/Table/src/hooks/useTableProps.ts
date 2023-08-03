import { useProps } from "@/hooks/core"
import { BasicTableProps } from "../props"
import { UseTablePropsReturnType, UseTablePropsSetMethods } from "../types"
import { useMemo } from "react"
import { TableRowSelectionProps } from "../props"
import { SizeType } from "antd/es/config-provider/SizeContext"

export function useTableProps<T extends Recordable = any>(props: BasicTableProps<T>): UseTablePropsReturnType<T> {
    const [propsState, propsMethods] = useProps(props)
    const {setProps} = propsMethods
    const setMethods: UseTablePropsSetMethods<T> = useMemo(() => {
        function setShowIndexColumn(value: boolean = true) {
            setProps({ showIndexColumn: !!value })
        }
        function setRowSelection(value?: TableRowSelectionProps<T>) {
            setProps({ rowSelection: value })
        }
        function setSize(value: SizeType = 'middle') {
            setProps({ size: value })
        }
        function setHeight(value: number = 0) {
            value && setProps({ height: value })
        }
        return {
            ...propsMethods,
            setShowIndexColumn,
            setRowSelection,
            setSize,
            setHeight,
        }
    }, [])
    return [propsState, setMethods]
}