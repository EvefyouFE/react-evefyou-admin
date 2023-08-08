import { Dropdown, Popconfirm } from "antd";
import { MenuDividerType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { FC, memo } from "react";
import { Icon } from "@/components/Icon";
import { BasicDropdownProps } from "./props";

export const BasicDropdown: FC<BasicDropdownProps> = ({
    popconfirm,
    dropdownRender,
    items,
    selectedKeys = [],
    children,
    ...props
}) => {
    const getItems = (): (MenuItemType | MenuDividerType)[] | undefined => items?.reduce((acc, item) => {
        let label = (
            <>
                <Icon icon={item.icon} />
                <span className="ml-1">{item.title}</span>
            </>
        );
        if (popconfirm && item.popconfirm) {
            const { icon, ...rest } = item.popconfirm
            label = (
                <Popconfirm icon={<Icon icon={icon} />} {...rest} >
                    <div>
                        {label}
                    </div>
                </Popconfirm>
            )
        }
        const { divider, onClick, key } = item;
        acc.push({
            key,
            label,
            onClick,
        })
        divider && acc.push({
            key,
            type: 'divider'
        })
        return acc;
    }, [] as (MenuItemType | MenuDividerType)[])

    const { menu, trigger = ['contextMenu'], ...rest } = props;

    return (
        <Dropdown
            menu={menu ?? {
                items: getItems(),
                selectedKeys
            }}
            trigger={trigger}
            {...rest}
        >
            <span>
                {children}
            </span>
        </Dropdown>
    )
}

export const BasicDropdownMemo = memo(BasicDropdown)