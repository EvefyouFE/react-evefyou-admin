import { useMemo } from "react";
import { BasicFormItemProps, BasicFormProps } from "../props";

export interface UseFormItemsMethods {

}

export type UseFormItemsReturnType = [
    BasicFormItemProps[],
    UseFormItemsMethods
]

export function useFormItems(props: BasicFormProps): UseFormItemsReturnType {
    const {
        items,
        showExpand = false,
    } = props;
    //过滤、
    const itemsMemo = useMemo(() => {
        if (!items?.length) return []
        let itemsValue = items.filter((item) => item.canRender??true);
        return itemsValue.map(item => ({
            formProps: props,
            ...item,
        }))
    }, [items, showExpand, props])

    return [itemsMemo,{}]
}