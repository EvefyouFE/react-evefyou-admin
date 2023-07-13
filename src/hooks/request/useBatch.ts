import axios from "axios";

export async function useBatch<T>(url: string, ids: number[]) {
    const data: T = await axios.post(
        `${url}`,
        { idList: ids },
    );
    return data;
}