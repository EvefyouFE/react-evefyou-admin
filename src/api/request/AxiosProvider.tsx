import React, { PropsWithChildren, useMemo } from 'react';
import { AxiosContext, defHttp } from '.';

export const AxiosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const axiosValue = useMemo(() => defHttp.getAxios(), []);
  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};
