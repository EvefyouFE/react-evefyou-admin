import { routes } from "@/routes";
import { menuListSelector } from "@/stores";
import { CrRouteObject } from "@/types/route";
import { TreeNode, convertTreeNodes } from "@/utils";
import { queryGetCurrentMenus } from "@api/index";
import { MenuItem, MenuTreeList } from "@models/auth/memu";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { useMenuSetting } from "../setting";

export type UseMenuList = {
    menuList: MenuTreeList | undefined;
    setMenuList: SetterOrUpdater<MenuTreeList>;
    generateRoutesMenuList: () => MenuTreeList;
}

export function useMenuList(): UseMenuList {
    const [menuList, setMenuList] = useRecoilState(menuListSelector);
    const { exposeMenuList, isRoutesMenu } = useMenuSetting();

    const res = !isRoutesMenu && useQuery({ ...queryGetCurrentMenus(), enabled: !menuList.length })
    res && useEffect(() => {
        res.data && setMenuList(res.data.data);
    }, [res.data])

    isRoutesMenu && useEffect(() => {
        const menus = exposeRoutesMenuList();
        menus && setMenuList(menus);
    }, [exposeMenuList]);
      
    function generateRoutesMenuList() {
        const menus = convertTreeNodes(routes[0].children as TreeNode<CrRouteObject>[], {
            handleKeys: {
                cloneKeys: ['path','name','locale','icon']
            }
        }) as MenuTreeList;
        return menus;
    }

    function filterMenuList(menus: MenuTreeList | undefined, conditionFn: (menu: MenuItem) => boolean): MenuTreeList | undefined {
        return menus?.filter((menu) => menu && conditionFn(menu))
            .map((menu) => ({
                ...menu,
                children: menu.children && filterMenuList(menu.children, conditionFn)
            }));
    }

    function exposeRoutesMenuList(): MenuTreeList | undefined {
        const menus = generateRoutesMenuList();
        return filterMenuList(menus, (menu) => exposeMenuList.includes(menu.path));
    }

    const data = res && res.data && res.data.data;
    return {
        menuList,
        ...data,
        setMenuList,
        generateRoutesMenuList
    }
}
