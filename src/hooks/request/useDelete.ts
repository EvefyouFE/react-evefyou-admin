import axios from "@api/request";

export async function useDelete<T>(url: string, id: number) {
    const data: T = await axios.delete(
        `${url}?id=${id}`,
    );
    return data;
}