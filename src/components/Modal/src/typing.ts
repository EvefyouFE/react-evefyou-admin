import { PropsWithChildren } from "react";
import { BaseInstance, UsePropsMethods } from "react-evefyou-hooks";
import { Actions } from "ahooks/lib/useBoolean";
import { BasicModalProps } from "./props";


export type UseModalPropsMethods = Pick<UsePropsMethods<BasicModalProps>, 'init'>;

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
    record?: object;
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


export interface ModalInnerProps {
    fullScreen: [boolean, Actions];
    instance: ModalInstance;
    okLoadingState: boolean;
    disabled: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}