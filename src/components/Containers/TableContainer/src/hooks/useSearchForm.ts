import { useMemo } from "react";
import { BasicFormProps } from "@/components/Form";
import { useCompInstance, useDesign } from "@/hooks";
import { BasicFormInstance } from "@/components/Form/src/types/form";
import classNames from "classnames";
import { TableContainerProps } from "../props";

export function useSearchForm<T extends Recordable = any>(props: TableContainerProps<T>) {
    const {searchConfig} = props
    const { rowProps, baseColProps } = searchConfig || {};
    const {prefixCls} = useDesign('basic-table-container-search-form')
    const className = classNames(prefixCls, 'bg-white mb-4')
    const searchPropsValue: BasicFormProps | undefined = useMemo(() => {
        return searchConfig ? {
            rowProps: {
                gutter: 24,
                align: 'middle',
                justify: 'center',
                ...rowProps,
            },
            baseColProps: {
                span: 6,
                ...baseColProps,
            },
            showAction: true,
            className,
            ...searchConfig,
        } : undefined
    }, [props])

    return useCompInstance<BasicFormInstance<any>>(searchPropsValue)
}