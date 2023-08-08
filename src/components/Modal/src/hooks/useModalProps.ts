import { useProps } from "@/hooks/core";
import { UseModalPropsReturnType } from "../typing";
import { BasicModalProps } from "../props";

export function useModalProps(props: BasicModalProps): UseModalPropsReturnType {
    return useProps(props)
}