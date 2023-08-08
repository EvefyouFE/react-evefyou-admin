import { TablePaginationConfig } from "antd";
import { isEmpty } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from "../constants";
import { BasicTableProps } from "../props";
import { UsePaginationReturnType } from "../types/tablePagination";
import { formatById } from "@/locales";


export const DEFAULT_PAGINATION_PROPS: TablePaginationConfig = {
    current: 1,
    pageSize: PAGE_SIZE,
    size: 'small',
    defaultPageSize: PAGE_SIZE,
    showTotal: (total) => formatById('components.table.total', { total }),
    showSizeChanger: true,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    showQuickJumper: true,
}

export function usePagination({ pagination }: BasicTableProps): UsePaginationReturnType {
    const [paginationState, setPaginationState] = useState<TablePaginationConfig | false>(pagination ?? {})

    useEffect(() => {
        if (pagination) {
            setPaginationState(p => ({
                ...p,
                ...(isEmpty(p) ? DEFAULT_PAGINATION_PROPS : p),
                ...pagination,
            }))
        }
    }, [pagination])

    return useMemo(() => {
        function getPagination() {
            return paginationState
        }
        function setPagination(info: Partial<TablePaginationConfig | false>) {
            setPaginationState({
                ...paginationState,
                ...info,
            })
        }
        return [
            paginationState,
            {
                getPagination,
                setPagination,
            }
        ]
    }, [paginationState]);
}