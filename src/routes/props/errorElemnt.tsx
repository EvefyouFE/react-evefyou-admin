import { BasicResult } from "@/components/Result";
import { FC } from "react";
import { useRouteError } from "react-router";

export const RouteErrorBoundary: FC = () => {
    let error = useRouteError();
    console.error(error);
    return (
        <BasicResult code={500} />
    );
}

export function errorBoundary() {
    return <RouteErrorBoundary />;
}