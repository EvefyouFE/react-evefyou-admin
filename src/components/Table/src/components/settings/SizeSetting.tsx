import { useSelectItems } from "@/hooks/components";
import { ColumnHeightOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip, TooltipProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useTableContext } from "../../BasicTable";

export type SizeSettingProps = Partial<TooltipProps> & {

}

const DEFAULT_ITEMS: MenuItemType[] = [
    {
        key: 'default',
        label: (
            <span>
                <FormattedMessage id="components.table.setting.size.default"/>
            </span>
        ),
    },
    {
        key: 'middle',
        label: (
            <span>
                <FormattedMessage id="components.table.setting.size.middle"/>
            </span>
        )
    },
    {
        key: 'small',
        label: (
            <span>
                <FormattedMessage id="components.table.setting.size.small"/>
            </span>
        )
    },
]

export const SizeSetting: React.FC<SizeSettingProps> = ({
    getPopupContainer
}) => {
    const [selectedKeys, items, {}] = useSelectItems<MenuItemType, React.Key>([''], DEFAULT_ITEMS)
    const {setSize} = useTableContext()

    function handleMenuClick({key}:{key: string}) {
        setSize(key as SizeType)
    }
    return (
        <Tooltip
            placement="top"
            getPopupContainer={getPopupContainer}
            title={
                <span>
                    <FormattedMessage id="components.table.setting.size" />
                </span>
            }
        >
            <Dropdown
                placement="bottom"
                trigger={['click']}
                getPopupContainer={getPopupContainer}
                
                menu={{
                    items,
                    selectable: true,
                    selectedKeys: selectedKeys as string[],
                    onClick: handleMenuClick
                }}
            >
                <ColumnHeightOutlined/>
            </Dropdown>
        </Tooltip>
    )
}