import { useProps } from "@/hooks";
import { TableContainerProps } from "../props";

export function useTableContainerProps<T extends Recordable = any>(props: TableContainerProps<T>) {
    return useProps(props)
}