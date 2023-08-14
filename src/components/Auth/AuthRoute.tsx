/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Auth\AuthRoute.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { homeLoaderFn } from '@routes/props';
import { FC } from 'react';
import { Navigate, RouteProps, useLoaderData } from 'react-router';
import { BasicResult } from '../Result';
import { usePermission } from '@/hooks/auth';
import { useUserRecoilState } from '@/stores/user';

export const AuthRoute: FC<RouteProps> = ({ children }) => {
  const { userInfoRes } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof homeLoaderFn>>
  >;
  const [{ token }] = useUserRecoilState();
  const { authenticateRouting } = usePermission();

  if (userInfoRes?.code !== 200 || !token) {
    return <Navigate to="/login" />;
  }

  if (!authenticateRouting()) {
    return <BasicResult code={403} />;
  }

  return <div>{children}</div>;
};

AuthRoute.displayName = 'AuthRoute';
