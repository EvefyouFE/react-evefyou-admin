import { AppLogo } from "@/components/Application";
import { BasicBreadcrumb } from "@/components/Breadcrumb";
import { useBaseeSetting, useMenuSetting } from "@/hooks";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { FC } from "react";

export const HeaderLeft: FC = () => {
    const {collapsed, toggleCollapsed, showCollapsed} = useMenuSetting();
    const {isMobile} = useBaseeSetting()
    


    return (
        <div className="flex justify-start items-center h-full w-full">
            {!showCollapsed && collapsed ? <AppLogo showTitle={false}/> : undefined}
            <div
                className="flex items-center h-full px-3 cursor-pointer transition-colors duration-300 hover:text-primary hover:bg-headerLeftTiggerHover "
                onClick={toggleCollapsed}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            {!isMobile ? <BasicBreadcrumb className="pl-2"/> : undefined}
        </div>
    )
}