import { PageReq } from "@models/base";
import { useState } from "react";



export function usePage(initialPagePrams?: PageReq) {
    const [pageParams, setPageParams] = useState(initialPagePrams ?? {current:1,pageSize:10});

    const setCurrent = (current: number) => setPageParams((p) => ({...p, current}))
    const setPageSize = (pageSize: number) => setPageParams((p) => ({...p, pageSize}))

    const onChange = (page: number, pageSize: number) => {
        setPageParams({current:page, pageSize});
    }

    // const showTotal = (total: number, range: [number, number]) => {
    //     return React.createElement(FormattedMessage, {
    //         id: 'page.total',
    //         values: {
    //             total
    //         }
    //     });
    // }

    return {
        pageParams,
        setPageParams,
        current: pageParams.current,
        setCurrent,
        pageSize: pageParams.pageSize,
        setPageSize,
        onChange,
        // showTotal
    }
}