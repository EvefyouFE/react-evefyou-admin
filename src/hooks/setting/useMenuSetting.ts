import { menuSettingSelector } from "@/stores";
import { MenuSetting } from "@/types/config";
import { useRecoilState } from "recoil";

export const useMenuSetting = () => {
    const [menuSetting, setMenuSetting] = useRecoilState(menuSettingSelector);
    const toggleCollapsed = () => {
        setMenuSetting({ collapsed: !menuSetting.collapsed, showMenu: !menuSetting.showCollapsed ? menuSetting.collapsed : true })
    };
    return {
        ...menuSetting as MenuSetting,
        setMenuSetting,
        toggleCollapsed,
    }
}

export default useMenuSetting