/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\pages\login\loginByUsername.tsx
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
 */
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { LoginByUsernameReq } from '@models/auth';
import { FormattedMessage } from 'react-intl';
import { useLocale } from '@/locales';
import { useUserRecoilState } from '@/stores/user';

export const LoginByUsername: FC = () => {
  const { formatById } = useLocale();
  const [
    ,
    {
      login,
      loginMutation: { isLoading },
    },
  ] = useUserRecoilState();

  const onFinished = async (form: LoginByUsernameReq) => {
    await login(form);
  };

  const usernamePlaceHolder = formatById('login.form.item.username');
  const passwordPlaceHolder = formatById('login.form.item.password');

  return (
    <Form<LoginByUsernameReq>
      onFinish={onFinished}
      style={{
        padding: '0 1.5rem',
      }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input placeholder={usernamePlaceHolder} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码！' }]}
      >
        <Input.Password placeholder={passwordPlaceHolder} />
      </Form.Item>
      <Button
        className="w-full"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        <FormattedMessage id="login.form.btn.submit" />
      </Button>
    </Form>
  );
};
