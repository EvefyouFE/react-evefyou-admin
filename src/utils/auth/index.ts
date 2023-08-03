import { Persistent, BasicKeys } from '@/utils/cache/persistent';
import { CacheTypeEnum } from '@/enums';
import { DEFAULT_PROJECT_CONFIG } from '@/config/app/project';
import { TOKEN_KEY } from '@/enums';

const { permissionCacheType } = DEFAULT_PROJECT_CONFIG;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
    return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
    const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
    return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value: any) {
    const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
    return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
    const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession;
    return fn(immediate);
}
