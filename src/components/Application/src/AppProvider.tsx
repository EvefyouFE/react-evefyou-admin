import { ModalProvider } from '@/components/Modal/src/context/ModalProvider';
import { prefixCls as defaultPrefixCls } from '@/config';
import {
    BreakpointsAntd,
} from '@/enums/settings/breakpointEnum';
import { useBaseSetting, useBreakpoint, useLayoutSetting, useMenuSetting } from '@/hooks';
import { FC, PropsWithChildren, useEffect } from 'react';
import { AppContext } from './useAppContext';

interface AppProviderProps {
    prefixCls?: string;
}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = (props) => {
    const { children, prefixCls = defaultPrefixCls } = props;
    const breakpoints = useBreakpoint(BreakpointsAntd);
    const {setMobileLayout} = useLayoutSetting();
    const {setMenuSetting} = useMenuSetting();
    const {isMobile,setBaseSetting} = useBaseSetting();

    const lgAndSmaller = breakpoints.smaller('LG');
    useEffect(() => {
        setBaseSetting({isMobile : lgAndSmaller});
        lgAndSmaller && setMenuSetting({collapsed: true, showCollapsed: true, showMenu: true})
        lgAndSmaller && setMobileLayout()
    }, [lgAndSmaller]);

    

    
    // function handleRestoreState() {
        
    // }

    return (
        <AppContext.Provider value={{ prefixCls, isMobile }}>
            <ModalProvider>
                {children}
            </ModalProvider>
        </AppContext.Provider>
    );
};

export default AppProvider;
