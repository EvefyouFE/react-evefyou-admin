import { TablePaginationConfig } from "antd";

export interface UsePaginationMethods {
    getPagination: () => TablePaginationConfig | false;
    setPagination: (info: Partial<TablePaginationConfig | false>) => void;
}

export type UsePaginationReturnType = [
    TablePaginationConfig | false,
    UsePaginationMethods
]