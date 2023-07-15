import { BasicTableProps } from "../props";
import { GetRowKey } from "antd/es/table/interface";

export type UseDataSourceProps<T extends Recordable = any> = {
    props: BasicTableProps<T>,
    getRowKey: GetRowKey<T>;
}

export interface UseDataSourceMethods<T extends Recordable = any> {
    getDataSource: () => T[];
    setDataSource: (dataSource: T[]) => void;
    findTableRecord: (rowKey: string | number) => { idxArr: number[], row?: T };
    findTableRecords: (rowKeys: (string | number)[]) => { idxArr: number[], row?: T }[];
    updateTableRecordProp: (index: number, key: keyof T, value: T[keyof T]) => Promise<T[keyof T]>;
    updateTableRecord: (rowKey: string | number, record: T) => T | undefined;
    deleteTableRecord: (rowKey: string | number | string[] | number[]) => void;
}

export type UseDataSourceReturnType<T extends Recordable = any> = [
    readonly T[],
    UseDataSourceMethods<T>
]