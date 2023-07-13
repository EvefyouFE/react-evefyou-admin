import { useState } from "react";

export function useList<T>() {
    const [current, setCurrent] = useState(1);
    const onChange = (page: number, pageSize: number) => {
        setCurrent(page);
    }

    return {
        current,
        setCurrent,
        onChange,
    }
}