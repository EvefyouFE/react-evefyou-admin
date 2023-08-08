import { TooltipProps } from "antd";
import { MouseEventHandler } from "react";

export type BasicHelpProps = Partial<TooltipProps> & {
    text?: string | string[];
    showIndex?: boolean;
    fontSize?: string;
    maxWidth?: string;
}

export interface BasicTittleProps {
    helpMessage?: string[] | string;
    span?: boolean;
    normal?: boolean;
    onDoubleClick?: MouseEventHandler;
}