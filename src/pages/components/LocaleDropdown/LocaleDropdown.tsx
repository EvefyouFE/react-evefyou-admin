import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { localeConfig } from '@/config/locale';
import { useUserRecoilState } from '@/stores/user';

type LocaleDropdownProps = PropsWithCls;

export const LocaleDropdown: FC<LocaleDropdownProps> = ({ className }) => {
  const [, { setLocale }] = useUserRecoilState();

  const items = localeConfig.map((v) => ({
    key: v.key,
    label: (
      <span
        onClick={() => {
          setLocale(v.key);
        }}
        onKeyUp={() => {
          setLocale(v.key);
        }}
        tabIndex={0}
        role="button"
      >
        <FormattedMessage id={v.key} />
      </span>
    ),
  }));

  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
      className={className}
    >
      <span className="cursor-pointer flex items-center">
        <TranslationOutlined />
      </span>
    </Dropdown>
  );
};
