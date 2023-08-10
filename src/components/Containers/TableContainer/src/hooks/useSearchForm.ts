/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Containers\TableContainer\src\hooks\useSearchForm.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import classNames from "classnames";
import { useCompInstance } from "react-evefyou-hooks";
import { useMemo } from "react";
import { BasicFormProps } from "@/components/Form";
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