import { ProjectConfig } from "@/types/config";
import { DEFAULT_BASE_SETTING } from "./baseSetting";
import { DEFAULT_LAYOUT_SETTING } from "./layoutSetting";
import { DEFAULT_MENU_SETTING } from "./menuSetting";
import { DEFAULT_TAB_CONTAINER_SETTING } from "./tabContainerSetting";

export const DEFAULT_PROJECT_CONFIG: ProjectConfig = {
  layoutSetting: DEFAULT_LAYOUT_SETTING,
  baseSetting: DEFAULT_BASE_SETTING,
  menuSetting: DEFAULT_MENU_SETTING,
  tabContainerSetting: DEFAULT_TAB_CONTAINER_SETTING
};
