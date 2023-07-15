import { useState } from "react";

export function useList() {
    const [current, setCurrent] = useState(1);
    const onChange = (page: number, pageSize: number) => {
        console.debug(page, pageSize)
        setCurrent(page);
    }

    return {
        current,
        setCurrent,
        onChange,
    }
}