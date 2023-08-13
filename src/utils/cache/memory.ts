/*
 * Copyright Notice:
 * Original code Copyright (c) 2020-present, Vben
 * This code section is based on vue-vben-admin.
 */
import { StorageValue } from "./storageCache";

export interface CacheInfo<V extends StorageValue = StorageValue> {
  value?: V;
  timeoutId?: ReturnType<typeof setTimeout>;
  time?: number;
  alive?: number;
}

export type Cache<T = Recordable, V extends StorageValue = StorageValue> = {
  [key in keyof T]?: CacheInfo<V>;
}

const NOT_ALIVE = 0;

export class Memory<T = Recordable, V extends StorageValue = StorageValue> {
  private cache: Cache<T, V> = {};

  private alive: number;

  constructor(alive = NOT_ALIVE) {
    // Unit second
    this.alive = alive * 1000;
  }

  get getCache() {
    return this.cache;
  }

  setCache(cache: { [key in keyof T]?: CacheInfo<V> }) {
    this.cache = cache;
  }

  // get<K extends keyof T>(key: K) {
  //   const item = this.getItem(key);
  //   const time = item?.time;
  //   if (!isNullOrUnDef(time) && time < new Date().getTime()) {
  //     this.remove(key);
  //   }
  //   return item?.value ?? undefined;
  // }

  get<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  set<K extends keyof T>(key: K, value: V, exp?: number) {
    let item = this.get(key);

    let expires = exp
    if (!expires || (expires) <= 0) {
      expires = this.alive;
    }
    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
        item.timeoutId = undefined;
      }
      item.value = value;
    } else {
      item = { value, alive: expires };
      this.cache[key] = item;
    }

    if (!expires) {
      return value;
    }
    const now = new Date().getTime();
    /**
     * Prevent overflow of the setTimeout Maximum delay value
     * Maximum delay value 2,147,483,647 ms
     * https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
     */
    item.time = expires > now ? expires : now + expires;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      expires > now ? expires - now : expires,
    );

    return value;
  }

  remove<K extends keyof T>(key: K) {
    const item = this.get(key);
    Reflect.deleteProperty(this.cache, key);
    if (item) {
      clearTimeout(item.timeoutId);
      return item.value;
    }
    return undefined;
  }

  resetCache(cache: Cache<T, V>) {
    Object.keys(cache).forEach((key) => {
      const k = key as keyof T;
      const item = cache[k];
      if (item && item.time) {
        const now = new Date().getTime();
        const expire = item.time;
        if (expire > now && item.value) {
          this.set(k, item.value, expire);
        }
      }
    });
  }

  clear() {
    Object.keys(this.cache).forEach((key) => {
      const item = this.cache[key as keyof T];
      item?.timeoutId && clearTimeout(item.timeoutId);
    });
    this.cache = {};
  }
}
