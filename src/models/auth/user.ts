import { ProjectConfig } from "@/types/config";
import { Role } from "./auth";
import { Device } from "./info";
import { MenuTreeList } from "./memu";
import { LocaleTypeEnum } from "@/config";

export type Locale = `${LocaleTypeEnum}`;

export interface CurrentUserRes {
  username: string;
  role: Role[];
  permissions: string[]
}


export interface User {
  username: string;

  /** menu list for init tagsView */
  menuList: MenuTreeList;

  permissions: string[];

  roles: Role[];

  /** user's device */
  device: Device;

  /** user's language */
  locale: Locale;

  /** Is first time to view the site ? */
  newUser: boolean;

  settings?: ProjectConfig;
  avatar: string;
}
