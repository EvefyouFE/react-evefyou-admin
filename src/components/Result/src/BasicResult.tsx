import { ResCode } from "@models/base";
import { FC, PropsWithChildren } from "react";
import { EmptyResult } from "./components/EmptyResult";
import { ErrorResult } from "./components/ErrorResult";
import { NotExistResult } from "./components/NotExistResult";

export interface BasicResultProps extends PropsWithChildren {
    code?: ResCode
}
export const BasicResult: FC<BasicResultProps> = ({
    code,
    children
}) => {
    switch (code) {
        case 200:
            return children ? <>{children}</> : <EmptyResult />
        case 404:
            return <NotExistResult />
        case 500:
        default:
            return (
                <ErrorResult />
            )

    }
}