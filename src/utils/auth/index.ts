import { Persistent, BasicKeys } from '@/utils/cache/persistent';
import { CacheTypeEnum, TOKEN_KEY } from '@/enums';
import { DEFAULT_PROJECT_CONFIG } from '@/config/app/project';
import { StorageValue } from "../cache/storageCache";

const { permissionCacheType } = DEFAULT_PROJECT_CONFIG;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
    return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
    return isLocal ? Persistent.getLocal(key) : Persistent.getSession(key) as T;
}

export function setAuthCache(key: BasicKeys, value: StorageValue) {
    return isLocal ? Persistent.setLocal(key, value, true) : Persistent.setSession(key, value, true);
}

export function clearAuthCache(immediate = true) {
    return isLocal ? Persistent.clearLocal(immediate) : Persistent.clearSession(immediate);
}
