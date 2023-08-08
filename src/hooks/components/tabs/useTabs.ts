import { CloseOutlined } from "@ant-design/icons";
import React, { Fragment, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Item } from "../items";

export interface TabItem extends Item<string> {
    label: React.ReactNode;
    children: React.ReactNode;
    closeIcon: React.ReactNode
}

export function useTabs() {
    function getTabItem(key: string, locale: string, title?: string, children?: React.ReactNode): TabItem {
        return {
            key,
            label: React.createElement(Fragment, {}, [
                React.createElement(FormattedMessage, { id: locale, key }),
                title
            ]),
            closeIcon: React.createElement(CloseOutlined),
            children
        }
    }

    return useMemo(() => ({
        getTabItem,
    }), [])
}