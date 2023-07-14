import { BasicResult } from "@/components/Result";
import React from "react";

export const NotExist: React.FC = () => {
    return (
        <BasicResult code={404}/>
    )
}