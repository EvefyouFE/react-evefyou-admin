import nProgress from 'nprogress';
import { FC, PropsWithChildren, useEffect } from "react";

nProgress.configure({
    showSpinner: false,
});

export const NProgress: FC<PropsWithChildren> = ({children}) => {
    useEffect(() => {
        nProgress.done();
        return () => {
            nProgress.start();
        };
    }, [])
    return (
        <>{children}</>
    )
}