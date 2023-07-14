import axios from "@api/request";

export async function useUpdate<T>(url: string, item: T) {
    const data: T = await axios.patch(
        `${url}`,
        item
    );
    return data;
}