import { useLocale } from '@/locales';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { LoginByUsernameReq } from '@models/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from '@api/query';
import { FormattedMessage } from 'react-intl';

export const LoginByUsername: FC = () => {
    const { formatById } = useLocale();
    const navigate = useNavigate();
    const location = useLocation();
    const loginMutation = useMutation(mutationLogin());

    const onFinished = async (form: LoginByUsernameReq) => {
        const { data: res } = await loginMutation.mutateAsync(form);
        if (res) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.username);
            navigate(location.state?.from || "/");
        }
    };

    const usernamePlaceHolder = formatById('login.form.item.username');
    const passwordPlaceHolder = formatById('login.form.item.password');


    return (
            <Form<LoginByUsernameReq>
                onFinish={onFinished}
                style={{
                    padding: '0 1.5rem'
                }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "请输入用户名！" }]}
                >
                    <Input
                        placeholder={usernamePlaceHolder}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "请输入密码！" }]}
                >
                    <Input.Password
                        placeholder={passwordPlaceHolder}
                    />
                </Form.Item>
                <Button
                    className='w-full'
                    type="primary"
                    htmlType="submit"
                    loading={loginMutation.isLoading}
                >
                    <FormattedMessage id="login.form.btn.submit" />
                </Button>
            </Form>
    );
};
