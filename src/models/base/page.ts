export interface Page<T> {
    resultData: T[];
    totalNum: number;
    pageNo: number;
    pageSize: number;
}