import { Header } from '@pages/layouts/header';
import { SiderNav } from '@pages/layouts/sider';
import { viewsPaths } from '@routes/crRoutes';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { FC, PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '@/components/Application';
import { TabContainer } from '@/components/Containers';
import {
  ErrorBoundaryFallback,
  LoadingFallback,
} from '@/components/Fallback/src';
import { KeepAliveMemo as KeepAlive } from '@/components/KeepAlive/KeepAlive';
import { useAppRecoilValue } from '@/stores/app';

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useAppContext();
  const [, { setMenuSetting }] = useAppRecoilValue();
  const onContentClick = () => setMenuSetting({ collapsed: true });
  return (
    <Layout hasSider>
      <SiderNav />
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
  const [, { getKeepAliveSetting }] = useAppRecoilValue();
  const { includes, includeAll, ...rest } = getKeepAliveSetting();
  return (
    <AdminLayout>
      <TabContainer>
        <KeepAlive includes={includeAll ? viewsPaths : includes} {...rest}>
          <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </KeepAlive>
      </TabContainer>
    </AdminLayout>
  );
};
export default AdminLayoutPage;
