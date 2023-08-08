import { ConfigProvider } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { AppLogo } from '@/components/Application';
import { ScrollContainer } from "@/components/Containers";
import { useLayoutSettingValue } from '@/hooks/setting';
import { useDesign } from '@/hooks/design';
import './index.less'
import { BasicMenu } from "@/components/Menu";
import { useAppRecoilValue } from "@/stores/app";
import { useAuthRecoilState } from "@/stores/auth";

export const SiderNav: React.FC = () => {
    const [, { getMenuSetting }] = useAppRecoilValue()
    const { collapsed, showMenu } = getMenuSetting();
    const [{ menuTreeList }] = useAuthRecoilState();
    const { siderWidthWithUnit } = useLayoutSettingValue()
    const { prefixCls } = useDesign('sider-nav')

    return (
        <Sider
            hidden={!showMenu}
            collapsible
            trigger={null}
            collapsed={collapsed}
            collapsedWidth="4rem"
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
                        menuTreeList && (
                            <BasicMenu
                                menuList={menuTreeList}
                            />
                        )
                    }

                </ScrollContainer>
            </ConfigProvider>
        </Sider>
    );
};

