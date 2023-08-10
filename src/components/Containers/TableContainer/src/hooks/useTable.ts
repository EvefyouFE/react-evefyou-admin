import { useCompInstance } from "react-evefyou-hooks";
import { BasicTableInstance } from "@/components/Table/src/types/tableHook";
import { TableContainerProps } from "../props";

export function useTable<T = any>(props: TableContainerProps<T>) {
    return useCompInstance<BasicTableInstance<T>>(props)
}