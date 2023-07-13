import { DeviceTypeEnum, User } from "@models/auth";
import { DEFAULT_PROJECT_CONFIG } from "../app/project";

export const DEFAULT_USER_INFO: User = {
    username: 'evef',
    avatar: '',
    permissions: [],
    roles: ['admin'],
    menuList: [],
    device: DeviceTypeEnum.DESKTOP,
    locale: 'zh-cn',
    newUser: true,
    settings: DEFAULT_PROJECT_CONFIG,
}