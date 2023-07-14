import { AuthRoute } from "@/components/Auth";
import { LazyModule } from "@/types/route";
import React from "react";

/**
 * 包裹认证路由
 */
function wrapAuthRoute(Component: React.ComponentType<any>): React.ComponentType<any> {
    return () => (<AuthRoute><Component/></AuthRoute>)
};

/**
 * 为动态 import 包裹 lazy 和 Suspense
 */
function wrapSuspense(importer: LazyModule) {
    // if (!importer) {
    //     return undefined;
    // }
    // const Component = lazy(importer);
    // return (
    //     // <Suspense fallback={<SuspenseFallbackNProgress />} >
    //         <Component />
    //     // </Suspense>
    // );
}

export function wrapComponent(Component: React.ComponentType<any>, options?: WrapElemntOptions) {
    if(!Component) return null;
    const {auth} = options || {};
    let WrappedComponent = auth ? wrapAuthRoute(Component) : Component
    return WrappedComponent;
};

interface WrapElemntOptions {
    auth?: boolean;
}
