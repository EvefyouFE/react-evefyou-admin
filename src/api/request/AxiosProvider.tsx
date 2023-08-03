import React, { PropsWithChildren, useMemo } from "react";
import { AxiosContext, defHttp } from ".";

export const AxiosProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const axiosValue = useMemo(() => {
        return defHttp.getAxios()
    }, []);
    return (
        <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
    );
};