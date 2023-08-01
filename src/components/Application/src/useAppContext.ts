import { createContext, useContext } from 'react';

export interface AppContextProps {
    name: string;
    prefixCls: string;
    isMobile: boolean;
}

export const createAppContext = (props: AppContextProps) =>
    createContext(props);

export const defaultValue: AppContextProps = {
    name: 'Evefyou',
    prefixCls: 'evefyou',
    isMobile: false,
}

export const AppContext = createAppContext(defaultValue);

export const useAppContext = () => useContext(AppContext);
