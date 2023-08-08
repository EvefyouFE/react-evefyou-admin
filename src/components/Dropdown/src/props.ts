import { DropdownProps } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { PropsWithChildren } from "react";
import { DropMenuItem } from "./typing";


export interface BasicDropdownProps extends PropsWithChildren<DropdownProps> {
    popconfirm: boolean,
    onClick?: MenuItemType['onClick'];
    selectedKeys?: string[];
    items?: DropMenuItem[];
}