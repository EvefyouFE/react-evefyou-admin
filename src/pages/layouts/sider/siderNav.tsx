import { AppLogo } from '@/components/Application';
import { ScrollContainer } from "@/components/Containers";
import { useDesign, useLayoutSetting, useMenuSetting } from '@/hooks';
import { useMenuList } from '@/hooks/user';
import { ConfigProvider } from 'antd';
import Sider from 'antd/es/layout/Sider';
import './index.less'
import { BasicMenu } from "@/components/Menu";

export interface SiderNavProps {
}

export const SiderNav: React.FC = () => {
    const { collapsed, showMenu } = useMenuSetting();
    const { menuList } = useMenuList();
    const { siderWidthWithUnit } = useLayoutSetting()
    const {prefixCls} = useDesign('sider-nav')

    return (
        <Sider
            hidden={!showMenu}
            collapsible
            trigger={null}
            collapsed={collapsed}
            collapsedWidth={'4rem'}
            width={siderWidthWithUnit}
            className="h-screen"
        >
            <AppLogo showTitle={!collapsed} className="h-layoutTopHeight" />
            <ConfigProvider
                theme={{
                    token: {
                        borderRadius: 0,
                    },
                }}
            >
                <ScrollContainer className={`${prefixCls}-content`} >
                    {
                        menuList && (
                            <BasicMenu
                                menuList={menuList}
                            />
                        )
                    }

                </ScrollContainer>
            </ConfigProvider>
        </Sider>
    );
};

