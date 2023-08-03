import { PopConfirmButton } from "@/components/Button/src";
import { BasicDropdown } from "@/components/Dropdown";
import { Icon } from "@/components/Icon";
import { usePermission } from "@/hooks/auth";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Divider, Tooltip, TooltipProps } from "antd";
import { is } from "ramda";
import React, { FC } from "react";
import { TableActionProps } from "../props";
import { TableActionItem } from "../types";

export const TableAction: FC<TableActionProps> = ({
    divider = true,
    items,
    dropDownItems,
    renderItem,
    renderDropdownHeader,
}) => {
    if (!items && dropDownItems) return null;

    // 

    const { hasPermission } = usePermission();

    const getTooltip = (data: string | TooltipProps): TooltipProps => {
        return {
            //TODO 这里要绑定table
            // getPopupContainer: () => undefined ?? document.body,
            placement: 'bottom',
            ...(is(String, data) ? { title: data } : data),
        };
    }

    const getItem = (item: TableActionItem) => {
        if (renderItem) return renderItem(item);
        const { tooltip, popConfirmProps, icon, disabled, title, onClick } = item;
        const ActionButton = (
            <PopConfirmButton
                title={title}
                icon={<Icon icon={icon} />}
                disabled={disabled}
                popconfirmProps={popConfirmProps}
                onClick={onClick}
                type="link"
            />
        )
        return tooltip
            ? (
                <Tooltip {...getTooltip(tooltip)}>
                    {ActionButton}
                </Tooltip>
            )
            : ActionButton;
    }

    const getDropdownItems = () => {
        return dropDownItems
            ?.filter((action) => hasPermission(action.auth) && action.show)
            .map((action, index, array) => {
                const { key, popConfirmProps, title } = action;
                return {
                    key,
                    popConfirmProps,
                    title,
                    divider: index < array.length - 1 ? divider : false,
                };
            });
    }

    const DropdownHeader = renderDropdownHeader ? renderDropdownHeader() : (
        <Button icon={<MoreOutlined />} type="link" size="small" />
    )

    return (
        <div>
            {
                items?.map((item, index) => {
                    return (
                        <React.Fragment key={item.key}>
                            {getItem(item)}
                            {divider && index < items.length - 1 ? (
                                <Divider type="vertical" className="action-divider" />
                            ) : undefined}
                        </React.Fragment>
                    )
                })
            }
            {
                dropDownItems ? (
                    <BasicDropdown
                        trigger={['hover']}
                        items={getDropdownItems()}
                        popconfirm
                    >
                        {DropdownHeader}
                    </BasicDropdown>
                ) : undefined
            }
        </div>
    )
}