import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { FC } from 'react';
import { Outlet } from 'react-router';

interface CommonLayoutProps {
}

export const CommonLayout: FC<CommonLayoutProps> = ({

}) => {
    return (
        <Layout >
            <Content className='flex justify-center items-center'>
                <Outlet/>
            </Content>
            <Footer className="flex justify-center items-center">
                <span>Evefyou Admin ©2023 Created by EvefyouFE</span>
            </Footer>
        </Layout>
    );
};

export default CommonLayout;