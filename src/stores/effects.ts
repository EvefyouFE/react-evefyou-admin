import { AtomEffect, DefaultValue } from 'recoil';

// 定义 key 参数的类型
type LocalStorageKey = string;

// 定义 localStorageEffect 的类型
export const localStorageEffect = <T>(key: LocalStorageKey): AtomEffect<T> => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: T, oldValue: T | DefaultValue, isReset: boolean) => {
        console.debug(oldValue)
        if (isReset) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    });
};
