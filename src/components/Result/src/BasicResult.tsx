import React from "react";
import { EmptyResult } from "./components/EmptyResult";
import { ErrorResult } from "./components/ErrorResult";
import { NotExistResult } from "./components/NotExistResult";
import { ForbiddenResult } from "./components/ForbiddenResult";

export interface BasicResultProps {
    code?: number;
    children?: React.ReactElement;
}
export const BasicResult = ({
    code,
    children
}: BasicResultProps): React.ReactElement => {
    switch (code) {
        case 200:
            return (children || <EmptyResult />)
        case 404:
            return (<NotExistResult />)
        case 403:
            return (<ForbiddenResult />)
        case 500:
        default:
            return (<ErrorResult />)
    }
}