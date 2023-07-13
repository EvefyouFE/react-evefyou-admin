import { useLayoutSetting } from '@/hooks';
import { Header as AntdHeader } from 'antd/es/layout/layout';
import { FC } from 'react';
import { HeaderAction } from './HeaderAction';
import { HeaderLeft } from './HeaderLeft';

export const Header: FC = () => {
    const {headerHeightWithUnit} = useLayoutSetting()
    return (
        <AntdHeader
            className="flex items-center p-0 bg-white sticky top-0 z-10"
            style={{
                height: headerHeightWithUnit,
                borderBottom: '1px solid #eee'
            }}
        >
            <HeaderLeft />
            <HeaderAction />
        </AntdHeader>
    );
};

