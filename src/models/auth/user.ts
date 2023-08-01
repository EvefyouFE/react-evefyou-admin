import { ProjectConfig } from "@/types/config";
import { Role } from "./auth";
import { Device } from "./info";
import { MenuTreeList } from "./memu";
import { LocaleTypeEnum } from "@/config";

export type Locale = `${LocaleTypeEnum}`;

export interface CurrentUserRes extends UserInfo {
  roleList: Role[];
  permissionList: string[]
}


export interface UserInfo {
  username: string;

  /** menu list for init tagsView */
  menuList: MenuTreeList;

  /** user's device */
  device: Device;

  /** user's language */
  locale: Locale;

  /** Is first time to view the site ? */
  newUser: boolean;

  settings?: ProjectConfig;
  avatar: string;
  homePath?: string;
}

