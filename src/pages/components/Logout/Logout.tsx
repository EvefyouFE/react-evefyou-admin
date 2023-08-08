import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLogout } from '@/hooks/auth';

interface LogoutProps {
  locale?: string;
}

export const Logout: FC<LogoutProps> = ({ locale = '' }) => {
  const { onLogout } = useLogout();
  return (
    <span role="button" tabIndex={0} onClick={onLogout} onKeyUp={onLogout}>
      <FormattedMessage id={locale} defaultMessage="登出" />
    </span>
  );
};
