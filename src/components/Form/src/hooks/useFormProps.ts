import { useProps } from "@/hooks/core"
import { BasicFormProps } from "../props"
import { UseFormPropsReturnType } from "../types/formHooks"

export function useFormProps(props: BasicFormProps): UseFormPropsReturnType {
    return useProps(props)
}