import { QRCode } from 'antd';
import { FC } from 'react';
import { LoginTypeEnum } from '@/pages/constants/login';

export interface LoginByQrCodeProps {
  loginType: `${LoginTypeEnum}`;
}

const getQRCodeIcon = (loginType: `${LoginTypeEnum}`) => {
  switch (loginType) {
    case LoginTypeEnum.wechat:
      return 'src/assets/logo/wechat_logo.svg';
    case LoginTypeEnum.qq:
      return 'src/assets/logo/qq_logo.svg';
    default:
      return '';
  }
};

export const LoginByQrCode: FC<LoginByQrCodeProps> = (props) => {
  const { loginType } = props;
  return (
    <div className="flex justify-center items-center h-72">
      <QRCode value="hello" size={160} icon={getQRCodeIcon(loginType)} />
    </div>
  );
};
