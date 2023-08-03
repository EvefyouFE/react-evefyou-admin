import { BaseInstance, UsePropsMethods } from "@/hooks/core";
import { PropsWithChildren } from "react";
import { BasicModalProps } from "./props";

export interface UseModalPropsMethods extends Pick<UsePropsMethods<BasicModalProps>, 'init'> {
}

export type UseModalPropsReturnType = [BasicModalProps, UseModalPropsMethods]

export interface ModalHookMethods extends UseModalPropsMethods {
    isOpen?: () => boolean;
    open: () => void;
    closeModal: () => void;
    openOkLoading: () => void;
    closeOkLoading: () => void;
    openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
}

export interface ModalInstance extends BaseInstance<BasicModalProps>, Pick<ModalHookMethods,
'init'
| 'openModal'
| 'closeModal'
| 'openOkLoading'
| 'closeOkLoading'
> {
}

export interface ModalWrapperInstance {
    resetModalHeight: () => void;
}

export interface ModalContextData {
    isUpdate?: boolean;
    record?: Object;
}
export type ModalContextDataMap = {
    [key: string]: ModalContextData | undefined | null;
}
export type ModalContextOpenMap = {
    [key: string]: boolean | undefined | null;
}
export interface ModalContextValue {
    dataMap: ModalContextDataMap;
    setDataMap: React.Dispatch<React.SetStateAction<ModalContextDataMap>>;
    openMap: ModalContextOpenMap;
    setOpenMap: React.Dispatch<React.SetStateAction<ModalContextOpenMap>>;
}

export type ModalContextProps = PropsWithChildren;

