import { ModalProps } from "antd";
import { ButtonType } from "antd/es/button";
import React, { MouseEventHandler, PropsWithChildren } from "react";

export interface ModalFooterProps extends Partial<ModalProps> {
    okType?: ButtonType;
    onOk?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    onCancel?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    insertFooter?: React.ReactNode;
    centerFooter?: React.ReactNode;
    appendFooter?: React.ReactNode;
}

export interface ModalCloseProps {
    showFullscreen?: boolean;
    isFullscreen?: boolean;
    onFullScreen?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onCancel?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export interface ModalHeaderProps extends Partial<ModalProps> {
    helpMessage?: string[] | string;
    onDoubleClick?: MouseEventHandler;
    onMouseOver?: <T>(event?: React.MouseEvent<T, MouseEvent>) => void;
    onMouseOut?: <T>(event?: React.MouseEvent<T, MouseEvent>) => void;
}

export interface ModalWrapperProps extends PropsWithChildren {
    height?: number;
    isAdaptive?: boolean;
    headerHeight?: number;
    footerHeight?: number;
    footerHeightOffset?: number;
    isFullScreen?: boolean;
}

export interface BasicModalProps extends Partial<ModalProps> {
    footerProps?: ModalFooterProps;
    headerProps?: ModalHeaderProps;
    closeIconProps?: ModalCloseProps;
    wrapperProps?: ModalWrapperProps;
    onCancel?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    name?: string;
}
