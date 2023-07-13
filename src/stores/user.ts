import { DEFAULT_USER_INFO } from "@/config";
import { Locale, Role, User } from "@models/auth";
import { MenuTreeList } from "@models/auth/memu";
import { DefaultValue, atom, selector } from "recoil";

export const userAtom = atom<User>({
    key: 'userAtom',
    default: DEFAULT_USER_INFO,
});

export const menuListSelector = selector<MenuTreeList>({
    key: 'menuListSelector',
    get: ({ get }) => get(userAtom).menuList,
    set: ({ get, set }, newValue) => !(newValue instanceof DefaultValue) && set(userAtom, { ...get(userAtom), menuList: newValue })
});

export const localeSelector = selector<Locale>({
    key: 'localeSelector',
    get: ({ get }) => get(userAtom).locale,
    set: ({ get, set }, newValue) => !(newValue instanceof DefaultValue) && set(userAtom, { ...get(userAtom), locale: newValue })
});

export const permissionsSelector = selector<string[]>({
    key: 'permissionsSelector',
    get: ({ get }) => get(userAtom).permissions,
    set: ({ get, set }, newValue) => !(newValue instanceof DefaultValue) && set(userAtom, { ...get(userAtom), permissions: newValue })
});

export const rolesSelector = selector<Role[]>({
    key: 'rolesSelector',
    get: ({ get }) => get(userAtom).roles,
    set: ({ get, set }, newValue) => !(newValue instanceof DefaultValue) && set(userAtom, { ...get(userAtom), roles: newValue })
});


