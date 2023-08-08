import { AliasToken } from "antd/es/theme/internal";
import { CacheTypeEnum, SessionTimeoutProcessingEnum } from "@/enums";
import { Locale } from "@/models/auth";

export interface BaseSetting {
  theme: Partial<AliasToken>;
  prefixCls: string;
  locale: Locale;
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  useErrorHandle: boolean;

  layoutSetting: LayoutSetting;
  baseSetting: BaseSetting;
  menuSetting: MenuSetting;
  tabContainerSetting: TabContainerSetting;
}
