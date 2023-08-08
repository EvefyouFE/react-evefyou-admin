import { FC } from "react";
import { useRouteError } from "react-router";
import { BasicResult } from "@/components/Result";

export const RouteErrorBoundary: FC = () => {
    const error = useRouteError();
    console.error('error', error);
    return (
        <BasicResult code={500} />
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function errorBoundary() {
    return <RouteErrorBoundary />;
}