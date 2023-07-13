import { useMemo } from "react";
import { useCompInstance } from "@/hooks";
import { BasicTableInstance, BasicTableProps } from "@/components/Table";
import { omit } from "ramda";
import { TableContainerProps } from "../props";

export function useTable<T extends Recordable = any>(props: TableContainerProps<T>) {
    const tablePropsValue: BasicTableProps<T> = useMemo(() => {
        return omit(['searchConfig'], props)
    }, [props])
    return useCompInstance<BasicTableInstance<T>>(tablePropsValue)
}