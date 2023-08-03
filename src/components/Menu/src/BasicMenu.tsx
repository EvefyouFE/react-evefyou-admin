import { Icon } from '@/components/Icon';
import { useDesign } from '@/hooks/design';
import { MenuTreeList } from '@models/auth/memu';
import { ConfigProvider, Menu, MenuProps } from 'antd';
import { FC, isValidElement, useMemo, useTransition } from 'react';
import { useNavigate } from 'react-router';
import './index.less';
import { MenuItemLabel } from './MenuItemLabel';
import { useAppRecoilState } from "@/stores/app";

export type MenuItem = Required<MenuProps>['items'][number];

export const loopMenuItem = (menus?: MenuTreeList): MenuItem[] => {
    if (!menus) return [];
    const m = menus.map((item) => ({
        label: (<MenuItemLabel title={item.locale ? item.locale : item.name || ''} />),
        key: item.key ? item.key : item.path!!,
        icon: isValidElement(item.icon) ? (
            item.icon
        ) : (
            item.icon && <Icon icon={item.icon} />
        ),
        children: item.children && loopMenuItem(item.children)
    }));
    return m;
};

interface BasicMenuProps {
    menuList: MenuTreeList;
    className?: string;
}

export const BasicMenu: FC<BasicMenuProps> = (props) => {
    const { menuList, className } = props;

    const navigate = useNavigate();
    const [,startTrainsition] = useTransition();
    const [,{getMenuSetting}] = useAppRecoilState()
    const {collapsed} = getMenuSetting()
    const {prefixCls} = useDesign('basic-menu')

    const newMenuList = loopMenuItem(menuList);
    const handleClick = (item: MenuItem) => {
        startTrainsition(() => {
            navigate(item?.key as string)
        })
    }

    const mode = useMemo(() => {
        return collapsed 
            ? "vertical"
            : "inline" 
    }, [collapsed])

    return (
        <ConfigProvider
            theme={{
                token: {
                    controlHeightLG: 50,
                },
            }}
        >
            <Menu
                className={`${className} ${prefixCls}`}
                theme="dark"
                mode={mode}
                defaultSelectedKeys={[newMenuList[0]?.key as string]}
                items={newMenuList}
                onClick={handleClick}
            >
            </Menu>
        </ConfigProvider>
    );
};

export default BasicMenu;
