export function isSubArray(array?: any[], sub?: any): boolean {
    return !!array?.every((v) => sub?.includes(v))
}