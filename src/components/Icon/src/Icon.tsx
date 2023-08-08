import * as icons from '@ant-design/icons';
import AntdIcon from '@ant-design/icons/lib/components/Icon';
import { Icon as Iconify } from '@iconify/react';
import { FC, isValidElement } from 'react';
import { ImgIcon } from './components/ImgIcon';
import { IconProps } from './typing';

export const Icon: FC<IconProps> = ({ icon, size, iconifyInline, ...rest }) => {
  if (!icon) return null;
  if (isValidElement(icon)) {
    return icon;
  }
  if (typeof icon !== 'string') return null;

  if (icon.indexOf('http') !== -1 || icon.indexOf(':') === -1) {
    return <ImgIcon url={icon} width={size} height={size} />;
  }
  const idx = icon.indexOf(':');
  const supplier = idx && icon.slice(0, idx);
  const name = idx && icon.slice(idx + 1, icon.length);
  if (!name) return null;
  switch (supplier) {
    case 'ant-icon':
      // eslint-disable-next-line no-case-declarations
      const antIcon: { [key: string]: any } = icons;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return <AntdIcon component={antIcon[name]} size={size} {...rest} />;
    case 'iconify':
      return <Iconify inline={iconifyInline} icon={name} {...rest} />;
    default:
      return null;
  }
};
