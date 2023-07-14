export type ResCode = 200 | 500 | 404
export interface Res<T> {
    code: ResCode;
    data: T;
    msg: string;
}