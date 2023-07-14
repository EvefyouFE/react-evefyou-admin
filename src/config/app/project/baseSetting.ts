import { BaseSetting } from "@/types/config";
import { generateAntColors } from "@/utils";

export const primaryColor = '#0960bd';

export const DEFAULT_BASE_SETTING: BaseSetting = {
    theme: {
        colorPrimary: generateAntColors(primaryColor)[5],
        fontSize: 14,
    },
    isMobile: false,
    locale: 'zh-cn',
    prefixCls: 'evefyou',
}
