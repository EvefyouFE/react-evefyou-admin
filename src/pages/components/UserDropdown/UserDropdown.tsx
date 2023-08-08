import { ReactComponent as LogoSvg } from '@assets/logo/nika_logo.svg';
import { Avatar, Dropdown } from 'antd';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Logout } from '../Logout';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">
        <FormattedMessage id="layout.header.user.dropdown.item.document" />
      </a>
    ),
  },
  {
    key: '2',
    label: <FormattedMessage id="layout.header.user.dropdown.item.setting" />,
  },
  {
    key: '3',
    label: <Logout locale="layout.header.user.dropdown.item.logout" />,
  },
];

export const UserDropdown: FC<PropsWithCls> = ({ className = '' }) => (
  <Dropdown menu={{ items }}>
    <div className={`${className} flex justify-center items-center`}>
      <Avatar icon={<LogoSvg />} />
      <span className="ml-2">Evef</span>
    </div>
  </Dropdown>
);
