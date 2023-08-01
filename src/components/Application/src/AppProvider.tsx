import { ModalProvider } from '@/components/Modal/src/context/ModalProvider';
import { prefixCls as defaultPrefixCls } from '@/config';
import {
    BreakpointsAntd,
} from '@/enums';
import { useBreakpoint, useLayoutSetting } from '@/hooks';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { AppContext } from './useAppContext';
import { useAppRecoilState } from "@/stores";

interface AppProviderProps {
    prefixCls?: string;
}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = (props) => {
    const { children, prefixCls = defaultPrefixCls } = props;
    const breakpoints = useBreakpoint(BreakpointsAntd);
    const {setMobileLayout} = useLayoutSetting();
    const [,{setMenuSetting}] = useAppRecoilState();
    const [isMobileState, setIsMobileState] = useState(false)

    const lgAndSmaller = breakpoints.smaller('LG');
    useEffect(() => {
        const isMobile = lgAndSmaller
        setIsMobileState(isMobile);
        isMobile && setMenuSetting({collapsed: true, showCollapsed: true, showMenu: true})
        isMobile && setMobileLayout()
    }, [lgAndSmaller]);

    
    
    // function handleRestoreState() {
    // }

    return (
        <AppContext.Provider value={{ prefixCls, isMobile: isMobileState, name: 'Evefyou' }}>
            <ModalProvider>
                {children}
            </ModalProvider>
        </AppContext.Provider>
    );
};

export default AppProvider;
