import axios from "@api/request";
import { AxiosRequestTransformer } from "axios";
import qs from 'qs';


type UseGetListParamOptions = {
    params: any
}

export async function useGetList<T>(url: string, options?: UseGetListParamOptions) {
    const {params} = options||{};
    

    const transformRequest: AxiosRequestTransformer = (data, headers) => {
        console.debug(data, headers)
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