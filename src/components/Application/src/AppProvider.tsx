/* eslint-disable react/jsx-no-constructed-context-values */
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ModalProvider } from '@/components/Modal/src/context/ModalProvider';
import { prefixCls as defaultPrefixCls } from '@/config/design';
import {
    BreakpointsAntd,
} from '@/enums';
import { useBreakpoint } from '@/hooks/event';
import { useLayoutSettingValue } from '@/hooks/setting';
import { AppContext } from './useAppContext';
import { useAppRecoilValue } from "@/stores/app";

interface AppProviderProps {
    prefixCls?: string;
}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = (props) => {
    const { children, prefixCls = defaultPrefixCls } = props;
    const breakpoints = useBreakpoint(BreakpointsAntd);
    const { setMobileLayout } = useLayoutSettingValue();
    const [, { setMenuSetting }] = useAppRecoilValue();
    const [isMobileState, setIsMobileState] = useState(false)

    const lgAndSmaller = breakpoints.smaller('LG');
    useEffect(() => {
        const isMobile = lgAndSmaller
        setIsMobileState(isMobile);
        isMobile && setMenuSetting({ collapsed: true, showCollapsed: true, showMenu: true })
        isMobile && setMobileLayout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
