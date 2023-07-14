import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';


export interface IconProps extends Partial<CustomIconComponentProps> {
    icon?: React.ReactNode;
    size?: number;
    iconifyInline?: boolean;
    className?: string;
    onClick?: () => void;
}
