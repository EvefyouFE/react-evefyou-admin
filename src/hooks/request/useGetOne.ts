import axios from "@api/request";

export async function useGetOne<T>(url: string, params?: any) {
    const data: T = await axios.get(
        `${url}`,
        params
    );
    return data;
} 