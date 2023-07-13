import { TabContainer } from "@/components/Containers";
import { CommonContainer } from "@/components/Containers/CommonContainer";
import { ErrorBoundaryFallback, LoadingFallback } from "@/components/Fallback/src";
import { KeepAliveMemo as KeepAlive } from '@/components/KeepAlive/KeepAlive';
import { useBaseeSetting, useLayoutSetting, useMenuSetting } from '@/hooks';
import { useKeepAliveSetting } from '@/hooks/setting/useKeepAliveSetting';
import { Header } from '@pages/layouts/header';
import { SiderNav } from '@pages/layouts/sider';
import { viewsPaths } from '@routes/crRoutes';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { FC, PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useOutlet } from 'react-router-dom';

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isMobile } = useBaseeSetting()
    const { collapsed, setMenuSetting } = useMenuSetting()
    const onContentClick = () => setMenuSetting({ collapsed: true })
    return (
        <Layout hasSider >
            <SiderNav collapsed={collapsed} />
            <Layout className="h-screen">
                <Header />
                <Content
                    className="h-full"
                    onClick={isMobile ? onContentClick : undefined}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export const AdminLayoutPage = () => {
    const Outlet = useOutlet()
    const { includes, includeAll, ...rest } = useKeepAliveSetting()
    return (
        <AdminLayout>
            <TabContainer >
                <KeepAlive includes={includeAll ? viewsPaths : includes} {...rest}>
                    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
                        <Suspense fallback={<LoadingFallback />}>
                            {Outlet}
                        </Suspense>
                    </ErrorBoundary>
                </KeepAlive>
            </TabContainer>
        </AdminLayout>
    )
}
export default AdminLayoutPage;
