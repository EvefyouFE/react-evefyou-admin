import { is, isEmpty } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { UseDataSourceProps, UseDataSourceReturnType } from "../types/tableDataSource";

export function useDataSource<T = any>(
    {
        props,
        getRowKey,
    }: UseDataSourceProps<T>
): UseDataSourceReturnType<T> {
    const {
        dataSource,
        childrenColumnName = 'children',
    } = props;
    const [dataSourceState, setDataSourceState] = useState<T[]>([])

    useEffect(() => {
        setDataSourceState([...(dataSource || [])])
    }, [dataSource])

    return useMemo(() => {
        function getDataSource() {
            return dataSourceState;
        }
        function setDataSource(ds: T[]) {
            return setDataSourceState(ds);
        }
        function findTableRecord(rowKey: string | number) {
            let idx: number;
            const idxArr: number[] = [];
            let row: T | undefined;
            dataSourceState.forEach(function iter(item, index) {
                idxArr.push(index)
                const tmpIdx = idx;
                idx = idx ? parseInt(`${idx}${index}`, 10) : index;
                if (getRowKey(item) === rowKey) {
                    row = item;
                    return;
                }
                (item[childrenColumnName as keyof T] as T[])?.forEach(iter)

                idx = tmpIdx;
                idxArr.pop()
            });
            return { idxArr, row };
        }
        function findTableRecords(rowKeyValues: (string | number)[]) {
            const arr: { idxArr: number[], row?: T }[] = [];
            let idx: number;
            const idxArr: number[] = [];
            let row: T | undefined;
            dataSourceState.forEach(function iter(item, index) {
                idxArr.push(index)
                const tmpIdx = idx;
                idx = idx ? parseInt(`${idx}${index}`, 10) : index;
                for (const rowKeyValue of rowKeyValues) {
                    if (getRowKey(item) === rowKeyValue) {
                        row = item;
                        arr.push({ idxArr, row })
                        break;
                    }
                }
                (item[childrenColumnName as keyof T] as T[])?.forEach(iter)
                idx = tmpIdx;
                idxArr.pop()
            });
            return arr;
        }
        /**
         * 更新某一项的某个属性值
         * @param index 
         * @param key 
         * @param value 
         * @returns 
         */
        function updateTableRecordProp(index: number, key: keyof T, value: T[keyof T]) {
            if (dataSourceState[index][key] && dataSourceState[index][key] !== value) {
                dataSourceState[index][key] = value;
                setDataSourceState({ ...dataSourceState })
            }
            return dataSourceState[index][key];
        }
        /**
         * 只更新当前项，多层级项换层需要外部处理重新设置datasource
         * @param rowKey 
         * @param record 
         * @returns 
         */
        function updateTableRecord(rowKey: string | number): T | undefined {
            const { row } = findTableRecord(rowKey);
            if (row) {
                // for (const field in row) {
                //     if (Reflect.has(record as object, field)) row[field] = record[field as keyof T];
                // }
                setDataSourceState({ ...dataSourceState })
            }
            return row;
        }
        function deleteTableRecord(rowKey: string | number | string[] | number[]) {
            if (!dataSourceState.length) return;
            const rowKeys = is(Array, rowKey) ? rowKey : [rowKey]
            const records = findTableRecords(rowKeys);
            const idxArrs = records.reduce((acc, { idxArr }) => isEmpty(idxArr) ? acc : [...acc, idxArr], [] as (string | number)[][])
            if (idxArrs.length) {
                idxArrs.forEach((idxArr) => {
                    if (!idxArr.length) {
                        return;
                    }
                    let level = -1;
                    dataSourceState.forEach(function iter(record, index) {
                        level += 1;
                        if (level < idxArr.length && index === idxArr[level]) {
                            const children = record[childrenColumnName as keyof T] as T[]
                            if (level === idxArr.length - 2) {
                                const delIdx = idxArr[idxArr.length - 1];
                                children?.splice(is(String, delIdx) ? Number.parseInt(delIdx, 10) : delIdx, 1);
                                return;
                            }
                            children?.forEach(iter);
                        }
                        level -= 1;
                    })
                })
                setDataSourceState({ ...dataSourceState })
            }

        }
        return [
            dataSourceState,
            {
                getDataSource,
                setDataSource,
                findTableRecord,
                findTableRecords,
                updateTableRecordProp,
                updateTableRecord,
                deleteTableRecord
            }
        ]
    }, [dataSourceState, childrenColumnName, getRowKey]);
}