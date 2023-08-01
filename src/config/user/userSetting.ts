import { DeviceTypeEnum, UserInfo } from "@models/auth";
import { DEFAULT_PROJECT_CONFIG } from "../app/project";

export const DEFAULT_USER_INFO: UserInfo = {
    username: 'evef',
    avatar: '',
    menuList: [],
    device: DeviceTypeEnum.DESKTOP,
    locale: 'zh-cn',
    newUser: true,
    settings: DEFAULT_PROJECT_CONFIG,
}