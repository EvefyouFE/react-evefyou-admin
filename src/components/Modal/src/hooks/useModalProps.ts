import { useProps } from "@/hooks";
import { UseModalPropsReturnType } from "../typing";
import { BasicModalProps } from "../props";

export function useModalProps(props: BasicModalProps): UseModalPropsReturnType {
    return useProps(props)

}