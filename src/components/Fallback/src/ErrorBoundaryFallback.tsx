import { BasicResult } from "@/components/Result";
import { FC } from "react";

export const ErrorBoundaryFallback: FC = () => {
    return (
        <BasicResult code={500} />
    );
}