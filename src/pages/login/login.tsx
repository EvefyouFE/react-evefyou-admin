import { ReactComponent as QQLogoSvg } from '@/assets/logo/qq_logo.svg';
import { ReactComponent as WechatLogoSvg } from '@/assets/logo/wechat_logo.svg';
import { LoginTypeEnum } from '@/pages/constants/login';
import { Space, Tabs, TabsProps } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './index.less';
import { LoginByMessage } from './loginByMessage';
import { LoginByQrCode } from './loginByQrCode';
import { LoginByUsername } from './loginByUsername';
import { useDesign } from "@/hooks/design";
import { useAppContext } from "@/components/Application";

const loginTypeItems: TabsProps['items'] = [
    {
        key: LoginTypeEnum.username,
        label: <FormattedMessage id="login.form.tabs.loginByUsername" />,
    },
    {
        key: LoginTypeEnum.message,
        label: <FormattedMessage id="login.form.tabs.loginByMessage" />,
    },
];

export const LoginForm: FC = () => {
    const [loginType, setLoginType] = useState<`${LoginTypeEnum}`>(LoginTypeEnum.username);
    const { prefixCls } = useDesign('login-form')
    const {name} = useAppContext()

    let children;
    const formHeader = (
        <h1 className='w-full flex justify-center items-center'>
            {name} Admin
        </h1>
    )
    switch (loginType) {
        case LoginTypeEnum.username:
            children = (
                <>
                    {formHeader}
                    <LoginByUsername />
                </>
            );
            break;
        case LoginTypeEnum.message:
            children = (
                <>
                    {formHeader}
                    <LoginByMessage />
                </>
            );
            break;
        case LoginTypeEnum.wechat:
        case LoginTypeEnum.qq:
            children = <LoginByQrCode loginType={loginType} />;
            break;
    }

    const rootClsName = classNames(prefixCls, 'flex flex-col justify-between w-100 h-100')

    return (
        <div className={rootClsName}>
            <Tabs
                size="large"
                centered={true}
                defaultActiveKey={LoginTypeEnum.username}
                items={loginTypeItems}
                animated={true}
                onTabClick={(key: string) => setLoginType(key as `${LoginTypeEnum}`)}
            />
            {children}
            <div
                className="flex justify-between items-center"
                style={{
                    padding: '1.5rem',
                    height: '2rem'
                }}
            >
                <Space align="center" direction="horizontal">
                    <WechatLogoSvg
                        className='cursor-pointer'
                        width="1.2em"
                        height="1.2em"
                        onClick={() => setLoginType(LoginTypeEnum.wechat)}
                    />
                    <QQLogoSvg
                        className='cursor-pointer'
                        width="1.2em"
                        height="1.2em"
                        onClick={() => setLoginType(LoginTypeEnum.qq)}
                    />
                </Space>
                <a>{'注册 >'}</a>
            </div>
        </div>
    );
};

export default LoginForm;