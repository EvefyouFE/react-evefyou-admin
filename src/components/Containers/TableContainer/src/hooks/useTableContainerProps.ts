import { useProps } from "@/hooks"
import { useMemo, useRef } from "react"
import { SizeType } from "antd/es/config-provider/SizeContext";
import { TableContainerProps } from "../props";

export function useTableContainerProps<T extends Recordable = any>(props: TableContainerProps<T>) {
    return useProps(props)
}