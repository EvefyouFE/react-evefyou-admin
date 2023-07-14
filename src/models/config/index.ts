import { AliasToken } from "antd/es/theme/internal";

export interface Config {
    locale: string,
    theme: Partial<AliasToken>,
    collapsed: boolean,
    isMobile: boolean,
    prefixCls: string,
}
