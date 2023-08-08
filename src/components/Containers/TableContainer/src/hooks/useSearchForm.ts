import classNames from "classnames";
import { useMemo } from "react";
import { BasicFormProps } from "@/components/Form";
import { useCompInstance } from "@/hooks/core";
import { useDesign } from "@/hooks/design";
import { BasicFormInstance } from "@/components/Form/src/types/formHooks";
import { TableContainerProps } from "../props";

export function useSearchForm<T = any>(props: TableContainerProps<T>) {
    const { searchConfig } = props
    const { prefixCls } = useDesign('basic-table-container-search-form')
    const searchPropsValue: BasicFormProps | undefined = useMemo(() => {
        const { rowProps, baseColProps } = searchConfig || {};
        const className = classNames(prefixCls, 'bg-white mb-4')
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
    }, [searchConfig, prefixCls])

    return useCompInstance<BasicFormInstance<any>>(searchPropsValue)
}