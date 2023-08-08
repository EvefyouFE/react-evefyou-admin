import { useProps } from "@/hooks/core";
import { TableContainerProps } from "../props";

export function useTableContainerProps<T = any>(props: TableContainerProps<T>) {
    return useProps(props)
}