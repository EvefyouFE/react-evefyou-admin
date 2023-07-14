import * as icons from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import React from 'react';

export const AntdIcon: React.FC<{
    name?: string,
    size?: string;
    className?: string;
}> = ({ name, size, className }) => {
    if(!name) return null;
    const antIcon: { [key: string]: any } = icons;
    return <Icon component={antIcon[name]} className={className} style={{
        height: size,
        width: size,
    }}/>
};

