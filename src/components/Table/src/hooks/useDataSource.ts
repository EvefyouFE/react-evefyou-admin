import { is, isEmpty } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { UseDataSourceProps, UseDataSourceReturnType } from "../types/tableDataSource";

export function useDataSource<T extends Recordable = any>(
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
        setDataSourceState([...(dataSource||[])])
    }, [dataSource])
    
    return useMemo(() => {
        function getDataSource() {
            return dataSourceState;
        }
        function setDataSource(dataSource: T[]) {
            return setDataSourceState(dataSource);
        }
        function findTableRecord(rowKey: string | number) {
            let idx: number;
            let idxArr: number[] = [];
            let row: T | undefined;
            dataSourceState.forEach(function iter(item, index) {
                idxArr.push(index)
                const tmpIdx = idx;
                idx = idx ? parseInt(`${idx}${index}`) : index;
                if (getRowKey(item) === rowKey) {
                    row = item;
                    return;
                }
                if (item[childrenColumnName]?.length) {
                    item[childrenColumnName].forEach(iter)
                }
                idx = tmpIdx;
                idxArr.pop()
            });
            return { idxArr, row };
        }
        function findTableRecords(rowKeyValues: (string | number)[]) {
            let arr: { idxArr: number[], row?: T }[] = [];
            let idx: number;
            let idxArr: number[] = [];
            let row: T | undefined;
            dataSourceState.forEach(function iter(item, index) {
                idxArr.push(index)
                const tmpIdx = idx;
                idx = idx ? parseInt(`${idx}${index}`) : index;
                for (const rowKeyValue of rowKeyValues) {
                    if (getRowKey(item) === rowKeyValue) {
                        row = item;
                        arr.push({ idxArr, row })
                        break;
                    }
                }
                if (item[childrenColumnName]?.length) {
                    item[childrenColumnName].forEach(iter)
                }
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
        async function updateTableRecordProp(index: number, key: keyof T, value: T[keyof T]) {
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
        function updateTableRecord(rowKey: string | number, record: T): T | undefined {
            const { row } = findTableRecord(rowKey);
            if (row) {
                for (const field in row) {
                    if (Reflect.has(record, field)) row[field] = record[field];
                }
                setDataSourceState({ ...dataSourceState })
                return row;
            }
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
                        level++;
                        if (level < idxArr.length && index === idxArr[level]) {
                            if (level === idxArr.length - 2) {
                                const delIdx = idxArr[idxArr.length - 1]
                                record[childrenColumnName]?.splice(delIdx, 1);
                                return;
                            } else {
                                record[childrenColumnName]?.forEach(iter);
                            }
                        }
                        level--;
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
    }, [dataSourceState,childrenColumnName,getRowKey]);
}