import { useLocale } from '@/locales';
import { LoginByMessageReq } from '@models/auth';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

export const LoginByMessage: FC = () => {
    const { formatById } = useLocale();
    const mobilePlaceHolder = formatById('login.form.item.mobile')
    const captchaPlaceHolder = formatById('login.form.item.captcha')
    return (
        <Form<LoginByMessageReq>
            style={{
                padding: '0 1.5rem'
            }}
        >
            <Form.Item
                name="mobile"
                rules={[{ required: true, message: "请输入手机号码！" }]}
            >
                <Input
                    placeholder={mobilePlaceHolder}
                />
            </Form.Item>
            <Form.Item
                name="captcha"
            >
                <div className='flex items-stretch'>
                    <Input
                        placeholder={captchaPlaceHolder}
                    />
                    <Button
                        type="primary"
                        style={{
                            marginLeft: '1rem'
                        }}
                    >
                        <FormattedMessage id="login.form.btn.sendMessage" />
                    </Button>
                </div>
            </Form.Item>
            <Button
                type="primary"
                className='w-full'
            >
                <FormattedMessage id="login.form.btn.submit" />
            </Button>
        </Form>
    );
};

