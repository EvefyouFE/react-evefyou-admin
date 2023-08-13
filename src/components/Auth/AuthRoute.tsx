import { homeLoaderFn } from '@routes/props';
import { FC } from 'react';
import { useMountEffect } from 'react-evefyou-hooks';
import { Navigate, RouteProps, useLoaderData } from 'react-router';
import { BasicResult } from '../Result';
import { DEFAULT_USER_INFO } from '@/config/user';
import { usePermission } from '@/hooks/auth';
import { useUserRecoilState } from '@/stores/user';

export const AuthRoute: FC<RouteProps> = ({ children }) => {
  const { userInfoRes } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof homeLoaderFn>>
  >;
  const [, { set: setUser }] = useUserRecoilState();
  const { authenticateRouting } = usePermission();

  useMountEffect(() =>
    setUser({
      userInfo: { ...DEFAULT_USER_INFO, ...user },
      token: '',
      roleList: [],
      permissionList: [],
      isSessionTimeout: true,
      lastUpdateTime: new Date().getTime(),
    }),
  );

  if (userInfoRes?.code !== 200) {
    return <Navigate to="/login" />;
  }

  const { data: user } = userInfoRes;

  if (!authenticateRouting()) {
    return <BasicResult code={403} />;
  }

  return <div>{children}</div>;
};

AuthRoute.displayName = 'AuthRoute';
