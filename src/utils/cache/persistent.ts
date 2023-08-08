import { omit, pick } from "ramda";
import { createLocalStorage, createSessionStorage } from '@/utils/cache';
import { Cache, Memory } from './memory';
import {
    TOKEN_KEY,
    USER_INFO_KEY,
    ROLES_KEY,
    LOCK_INFO_KEY,
    PROJ_CFG_KEY,
    APP_LOCAL_CACHE_KEY,
    APP_SESSION_CACHE_KEY,
    MULTIPLE_TABS_KEY,
} from '@/enums';
import { DEFAULT_CACHE_TIME } from '@/config/app/auth';
import { UserInfo } from "@/models";
import { ProjectConfig } from "@/types/config";
import { LockInfo } from "@/types/store";

interface BasicStore {
    [TOKEN_KEY]: string | number | null | undefined;
    [USER_INFO_KEY]: UserInfo;
    [ROLES_KEY]: string[];
    [LOCK_INFO_KEY]: LockInfo;
    [PROJ_CFG_KEY]: ProjectConfig;
    [MULTIPLE_TABS_KEY]: Location[];
}

type LocalStore = BasicStore;

type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

function initPersistentMemory() {
    const localCache = ls.get(APP_LOCAL_CACHE_KEY);
    const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
    localCache && localMemory.resetCache(localCache as Cache);
    sessionCache && sessionMemory.resetCache(sessionCache as Cache);
}

export class Persistent {
    static getLocal<T>(key: LocalKeys) {
        return localMemory.get(key)?.value as Nullable<T>;
    }

    static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
        localMemory.set(key, value);
        immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
    }

    static removeLocal(key: LocalKeys, immediate = false): void {
        localMemory.remove(key);
        immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
    }

    static clearLocal(immediate = false): void {
        localMemory.clear();
        immediate && ls.clear();
    }

    static getSession<T>(key: SessionKeys) {
        return sessionMemory.get(key)?.value as Nullable<T>;
    }

    static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
        sessionMemory.set(key, value);
        immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
    }

    static removeSession(key: SessionKeys, immediate = false): void {
        sessionMemory.remove(key);
        immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
    }

    static clearSession(immediate = false): void {
        sessionMemory.clear();
        immediate && ss.clear();
    }

    static clearAll(immediate = false) {
        sessionMemory.clear();
        localMemory.clear();
        if (immediate) {
            ls.clear();
            ss.clear();
        }
    }
}
function handler() {
    // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
    // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
    ls.set(APP_LOCAL_CACHE_KEY, {
        ...omit([LOCK_INFO_KEY], localMemory.getCache),
        ...pick([TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY], ls.get(APP_LOCAL_CACHE_KEY)) as object,
    });
    ss.set(APP_SESSION_CACHE_KEY, {
        ...omit([LOCK_INFO_KEY], sessionMemory.getCache),
        ...pick([TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY], ss.get(APP_SESSION_CACHE_KEY)) as object,
    });
}
window.addEventListener('beforeunload', handler);

function storageChange(e: Recordable) {
    const { key, newValue, oldValue } = e;

    if (!key) {
        Persistent.clearAll();
        return;
    }

    if (!!newValue && !!oldValue) {
        if (APP_LOCAL_CACHE_KEY === key) {
            Persistent.clearLocal();
        }
        if (APP_SESSION_CACHE_KEY === key) {
            Persistent.clearSession();
        }
    }
}

window.addEventListener('storage', storageChange);

initPersistentMemory();
