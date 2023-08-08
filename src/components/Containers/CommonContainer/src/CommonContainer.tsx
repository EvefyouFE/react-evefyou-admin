import { Footer } from "antd/es/layout/layout";
import classNames from "classnames";
import React, { PropsWithChildren, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import './index.less'
import { useDesign } from "@/hooks/design";
import { useLayoutSettingValue } from "@/hooks/setting";

export interface CommonContainerInstance {
    getElement: () => HTMLDivElement | null
}
export interface CommonContainerContextValue {
    getElement: () => HTMLDivElement | null;
}
const DEFAULT_COMMON_CONTAINER_VALUE: CommonContainerContextValue = {
    getElement: () => null
}
export const CommonContainerContext = React.createContext(DEFAULT_COMMON_CONTAINER_VALUE)
// eslint-disable-next-line react-refresh/only-export-components
export const useCommonContainerContext = () => React.useContext(CommonContainerContext)

export const CommonContainer = forwardRef<CommonContainerInstance, PropsWithChildren>(({
    children
}, ref) => {
    const { footerHeightWithUnit, calcPageContainerPadding } = useLayoutSettingValue()
    const { prefixCls } = useDesign('common-container');
    const rootClsName = classNames(prefixCls, 'h-full bg-slate-100')
    const containerRef = useRef<HTMLDivElement>(null)
    const value = useMemo(() => ({
        getElement: () => containerRef.current
    }), [])
    useImperativeHandle(ref, () => (value))
    return (
        <div className={rootClsName} ref={containerRef}>
            <div className={prefixCls.concat('-content')}>
                <CommonContainerContext.Provider value={value}>
                    {children}
                </CommonContainerContext.Provider>
            </div>
            <Footer className="flex justify-center items-center bg-slate-100"
                style={{
                    height: footerHeightWithUnit,
                    paddingLeft: calcPageContainerPadding(),
                    paddingRight: calcPageContainerPadding((v) => 2 * v),
                }}
            >
                <span>Evefyou Admin ©2023 Created by EvefyouFE</span>
            </Footer>
        </div>
    )
})

CommonContainer.displayName = 'CommonContainer'