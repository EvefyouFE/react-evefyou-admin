import { DEFAULT_USER_INFO } from "@/config";
import { useMountEffect } from "@/hooks";
import { userAtom } from "@/stores";
import { homeLoaderFn } from "@routes/props";
import { FC } from "react";
import { Navigate, RouteProps, useLoaderData } from "react-router";
import { useRecoilState } from "recoil";

export const AuthRoute: FC<RouteProps> = ({children}) => {
    const {userInfoRes} = useLoaderData() as Awaited<
        ReturnType<ReturnType<typeof homeLoaderFn>>
    >;
    if(userInfoRes?.code !== 200) {
        return <Navigate to="/login" />;
    }

    const {data: user} = userInfoRes;

    const [u,setUser] = useRecoilState(userAtom);
    
    

    useMountEffect(() => setUser({...DEFAULT_USER_INFO,...user}))

    return <div>{children}</div>
};