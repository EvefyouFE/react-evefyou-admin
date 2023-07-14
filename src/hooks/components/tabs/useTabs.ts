import { CloseOutlined } from "@ant-design/icons";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";

export interface TabItem {
    key: string;
    label: React.ReactNode;
    children: React.ReactNode;
    closeIcon: React.ReactNode
}

export function useTabs() {
    function getTabItem(key: string, locale: string, title?: string,children?: React.ReactNode): TabItem {
        return {
            key,
            label: React.createElement(Fragment,{},[
                React.createElement(FormattedMessage, {id: locale, key: key}),
                title
            ]),
            closeIcon: React.createElement(CloseOutlined),
            children
        }
    }

    return {
        getTabItem,
    }
}