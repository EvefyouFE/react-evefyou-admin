import { useDesign, useUnmountEffect } from "@/hooks";
import { useBoolean } from "ahooks";
import { Modal } from "antd";
import { assoc, equals } from "ramda";
import React, { forwardRef, useEffect, useId, useImperativeHandle, useMemo, useState } from "react";
import { useModalContext } from "./hooks";
import { BasicModalProps, ModalWrapperProps } from "./props";
import { ModalInstance } from "./typing";
import { useModalProps } from "./hooks/useModalProps";
import { useRenders } from "./renders";
import './index.less';
import { ModalWrapper } from "./components/ModalWrapper";
import classNames from "classnames";

export const BasicModal = React.memo(forwardRef<ModalInstance, BasicModalProps>((props, ref) => {
    const { children } = props
    const [propsState, propsMethods] = useModalProps(props)
    const [openState, { setTrue: open, setFalse: closeModal }] = useBoolean(false)
    const [okLoadingState, okLoadingMethods] = useBoolean(false)
    const { dataMap, setDataMap, openMap, setOpenMap } = useModalContext();
    const key = useId()
    const fullScreen = useBoolean(false)
    const [isFullScreenState] = fullScreen
    const { prefixCls } = useDesign('basic-modal')
    const disabled = useState(true);

    const instance: ModalInstance = useMemo(() => ({
        init: propsMethods.init,
        openModal,
        closeModal,
        openOkLoading: okLoadingMethods.setTrue,
        closeOkLoading: okLoadingMethods.setFalse,
    }), [propsMethods, okLoadingMethods])
    useImperativeHandle(ref, () => instance, [instance])

    const {
        header,
        closeIcon,
        footer,
        modalRender,
    } = useRenders(propsState, {
        fullScreen,
        instance,
        okLoadingState,
        disabled
    })

    const {
        title,
        wrapClassName,
        ...restPropsState
    } = propsState;
    const wrapClassNameValue = useMemo(() => {
        return classNames(prefixCls, wrapClassName, {'fullscreen-modal': isFullScreenState})
    }, [isFullScreenState])
    const propsValue: BasicModalProps = {
        centered: true,
        ...restPropsState,
        open: openState,
        title: header,
        footer,
        closeIcon,
        wrapClassName: wrapClassNameValue,
        modalRender,
    }
    const headerHeight = 56
    const footerHeight = 56
    const modalWrapperPropsValue: ModalWrapperProps = {
        headerHeight,
        footerHeight,
        isAdaptive: true,
        isFullScreen: isFullScreenState,
    }

    useEffect(() => {
        setOpenMap({
            ...assoc(key, openState, openMap)
        })
    }, [openState])

    useUnmountEffect(() => {
        setDataMap({
            ...assoc(key, null, dataMap)
        })
    })

    function openModal<T>(openState = true, data?: T, openOnSet = true) {
        console.debug(openState)
        open();
        // 缓存modal data
        if (!data) return;
        if (openOnSet) {
            setDataMap({
                ...assoc(key, data, dataMap),
            })
            return;
        }
        const equal = equals(dataMap[key], data);
        if (!equal) {
            setDataMap({
                ...assoc(key, data, dataMap),
            })
        }
    }
    return (
        <Modal key={key} {...propsValue} >
            <ModalWrapper {...modalWrapperPropsValue}>
                {children}
            </ModalWrapper>
        </Modal>
    )
}))