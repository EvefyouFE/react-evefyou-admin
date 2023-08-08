import { CacheTypeEnum, SessionTimeoutProcessingEnum } from "@/enums";
import { DEFAULT_BASE_SETTING } from "./baseSetting";
import { DEFAULT_LAYOUT_SETTING } from "./layoutSetting";
import { DEFAULT_MENU_SETTING } from "./menuSetting";
import { DEFAULT_TAB_CONTAINER_SETTING } from "./tabContainerSetting";
import { ProjectConfig } from "@/types/config";

export const DEFAULT_PROJECT_CONFIG: ProjectConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.PAGE_COVERAGE,
  useErrorHandle: true,

  layoutSetting: DEFAULT_LAYOUT_SETTING,
  baseSetting: DEFAULT_BASE_SETTING,
  menuSetting: DEFAULT_MENU_SETTING,
  tabContainerSetting: DEFAULT_TAB_CONTAINER_SETTING
};
