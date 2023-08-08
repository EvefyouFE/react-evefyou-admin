import { GetRowKey } from "antd/es/table/interface";
import { BasicTableProps } from "../props";

export type UseDataSourceProps<T = any> = {
    props: BasicTableProps<T>,
    getRowKey: GetRowKey<T>;
}

export interface UseDataSourceMethods<T = any> {
    getDataSource: () => T[];
    setDataSource: (dataSource: T[]) => void;
    findTableRecord: (rowKey: string | number) => { idxArr: number[], row?: T };
    findTableRecords: (rowKeys: (string | number)[]) => { idxArr: number[], row?: T }[];
    updateTableRecordProp: (index: number, key: keyof T, value: T[keyof T]) => T[keyof T];
    updateTableRecord: (rowKey: string | number, record: T) => T | undefined;
    deleteTableRecord: (rowKey: string | number | string[] | number[]) => void;
}

export type UseDataSourceReturnType<T = any> = [
    readonly T[],
    UseDataSourceMethods<T>
]