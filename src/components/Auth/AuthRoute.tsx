import { DEFAULT_USER_INFO } from "@/config";
import { useMountEffect, usePermission } from "@/hooks";
import { useUserRecoilState } from "@/stores";
import { homeLoaderFn } from "@routes/props";
import { FC } from "react";
import { Navigate, RouteProps, useLoaderData } from "react-router";
import { BasicResult } from "../Result";

export const AuthRoute: FC<RouteProps> = ({ children }) => {
    const { userInfoRes } = useLoaderData() as Awaited<
        ReturnType<ReturnType<typeof homeLoaderFn>>
    >;
    if (userInfoRes?.code !== 200) {
        return <Navigate to="/login" />;
    }

    const { data: user } = userInfoRes;

    const [, { set: setUser }] = useUserRecoilState();

    useMountEffect(() => setUser({ 
        userInfo: { ...DEFAULT_USER_INFO,...user }, 
        token: '', 
        roleList: [], 
        permissionList: [], 
        isSessionTimeout: true, 
        lastUpdateTime: new Date().getTime()
    }))

    const {authenticateRouting} = usePermission()

    const authRouting = authenticateRouting()
    if(!authRouting) {
        return <BasicResult code={403}/>
    }

    return <div>{children}</div>
};