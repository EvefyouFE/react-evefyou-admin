import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { LoginByUsernameReq } from '@models/auth';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLocale } from '@/locales';
import { useUserRecoilState } from "@/stores/user";
import { mutationLogin } from "@/api";

export const LoginByUsername: FC = () => {
    const { formatById } = useLocale();
    const [, { login }] = useUserRecoilState()
    const navigate = useNavigate();
    const loginMutation = mutationLogin.useMutation();

    const onFinished = async (form: LoginByUsernameReq) => {
        const userInfo = await login(form);
        if (userInfo) {
            // console.log('userinfo...', userInfo)
            navigate("/");
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
    )
}
