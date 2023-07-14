import { AxiosContext } from "@api/request";
import { useContext } from "react";

export function useAxios() {
    return useContext(AxiosContext);
}