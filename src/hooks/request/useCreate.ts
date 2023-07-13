import axios from "@api/request";

export async function useCreate<T,R>(url: string, params?: T) {
    const data: R = await axios.post(
        `${url}`,
        params
    );
    return data;
}