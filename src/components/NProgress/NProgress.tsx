import nProgress from 'nprogress';
import React, { useEffect } from "react";

nProgress.configure({
    showSpinner: false,
});

export const NProgress = ({ children }: { children: React.ReactElement }): React.ReactElement => {
    useEffect(() => {
        nProgress.done();
        return () => {
            nProgress.start();
        };
    }, [])
    return children
}