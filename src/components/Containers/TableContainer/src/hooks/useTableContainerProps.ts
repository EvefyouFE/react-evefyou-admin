import { useProps } from "react-evefyou-hooks";
import { TableContainerProps } from "../props";

export function useTableContainerProps<T = any>(props: TableContainerProps<T>) {
    return useProps(props)
}