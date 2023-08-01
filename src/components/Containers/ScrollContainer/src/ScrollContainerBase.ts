import { CSSProperties } from "react";
import { ObjectUtils } from "./utils";
import { genUUID } from "@/utils";

export type ScrollContainerDefaultProps = PropsWithChildrenCls<{
    __TYPE: 'ScrollContainer';
    id: string;
    style: CSSProperties;
}> 

export type ScrollContainerProps = ScrollContainerDefaultProps & Recordable

export const ScrollContainerBase: {
    defaultProps: ScrollContainerDefaultProps;
    getProps: (props: Recordable) => ScrollContainerProps;
    getOtherProps: (props: Recordable) => Omit<Recordable, keyof ScrollContainerDefaultProps>;
} = {
    defaultProps: {
        __TYPE: 'ScrollContainer',
        id: genUUID(),
        style: {} as CSSProperties,
        className: '',
        children: undefined
    },
    getProps: (props: Recordable) => ObjectUtils.getMergedProps(props, ScrollContainerBase.defaultProps),
    getOtherProps: (props: any) => ObjectUtils.getDiffProps(props, ScrollContainerBase.defaultProps)
};