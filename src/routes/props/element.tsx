import React from "react";
import { AuthRoute } from "@/components/Auth";

/**
 * 包裹认证路由
 */
function wrapAuthRoute(Component: React.ComponentType<any>): React.ComponentType<any> {
    const Comp = () => (<AuthRoute><Component /></AuthRoute>)
    return Comp
}

export function wrapComponent(Component: React.ComponentType<any>, options?: WrapElemntOptions) {
    if (!Component) return null;
    const { auth } = options || {};
    const WrappedComponent = auth ? wrapAuthRoute(Component) : Component
    return WrappedComponent;
}

interface WrapElemntOptions {
    auth?: boolean;
}
