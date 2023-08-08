import { PopconfirmProps } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";

export interface DropMenuItem extends MenuItemType {
    popconfirm?: PopconfirmProps;
    // onClick?: MenuItemType['onClick'];
    // to?: string;
    icon?: string;
    key: React.Key;
    // text?: string;
    disabled?: boolean;
    divider?: boolean;
}
