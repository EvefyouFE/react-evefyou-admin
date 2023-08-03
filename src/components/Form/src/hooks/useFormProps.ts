import { useProps } from "@/hooks/core"
import { BasicFormProps } from "../props"
import { UseFormPropsReturnType } from "../types/form"

export function useFormProps(props: BasicFormProps): UseFormPropsReturnType {
    return useProps(props)
}