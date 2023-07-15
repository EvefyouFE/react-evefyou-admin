import { AuthRoute } from "@/components/Auth";
import React from "react";

/**
 * 包裹认证路由
 */
function wrapAuthRoute(Component: React.ComponentType<any>): React.ComponentType<any> {
    return () => (<AuthRoute><Component/></AuthRoute>)
};

export function wrapComponent(Component: React.ComponentType<any>, options?: WrapElemntOptions) {
    if(!Component) return null;
    const {auth} = options || {};
    let WrappedComponent = auth ? wrapAuthRoute(Component) : Component
    return WrappedComponent;
};

interface WrapElemntOptions {
    auth?: boolean;
}
