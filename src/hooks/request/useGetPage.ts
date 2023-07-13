import axios from "@api/request";
import { AxiosRequestTransformer } from "axios";
import qs from 'qs';


type UseGetListParamOptions = {
    params: any
}

export async function useGetPage<T>(url: string, options?: UseGetListParamOptions) {
    const {params: reqParams} = options||{};
    const params = {
        pageNo: reqParams?.current ?? 1,
        pageSize: 10,
        ...reqParams
    }
    

    const transformRequest: AxiosRequestTransformer = (data, headers) => {
    }
    const data: T = await axios.get(
        `${url}`, {
        params,
        paramsSerializer: {
            serialize: params => qs.stringify(params, { arrayFormat: 'repeat' })
        },
        transformRequest
    });
    return data;
}