import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import React, { useCallback, useRef, useState } from 'react';
import { ModalHeader } from './components/ModalHeader';
import {
  BasicModalProps,
  ModalCloseProps,
  ModalFooterProps,
  ModalHeaderProps,
} from './props';
import { ModalInnerProps } from './typing';
import { ModalClose } from './components/ModalClose';
import { ModalFooter } from './components/ModalFooter';

export function useRenders(
  props: BasicModalProps,
  innerProps: ModalInnerProps,
) {
  const header = useRenderHeader(props, innerProps);
  const closeIcon = renderClose(props, innerProps);
  const footer = renderFooter(props, innerProps);
  const modalRender = useRenderModal(props, innerProps);
  return {
    header,
    closeIcon,
    footer,
    modalRender,
  };
}

export function useRenderModal(
  props: BasicModalProps,
  innerProps: ModalInnerProps,
) {
  console.debug(props);
  const {
    disabled: [disabledState],
  } = innerProps;
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  const Comp = (modal: React.ReactNode) => (
    <Draggable
      disabled={disabledState}
      bounds={bounds}
      nodeRef={draggleRef}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div ref={draggleRef}>{modal}</div>
    </Draggable>
  );
  return Comp;
}

export function useRenderHeader(
  props: BasicModalProps,
  innerProps: ModalInnerProps,
) {
  const { closeIconProps = {}, headerProps } = props;
  const { showFullscreen = true } = closeIconProps;
  const {
    fullScreen: [, { toggle: toggleFullscreen }],
    disabled: [disabledState, setDisabledState],
  } = innerProps;
  const onDoubleClick = useCallback(handleTitleDbClick, [
    showFullscreen,
    toggleFullscreen,
  ]);
  const propsValue: ModalHeaderProps = {
    onDoubleClick,
    onMouseOver: () => {
      disabledState && setDisabledState(false);
    },
    onMouseOut: () => setDisabledState(true),
    ...headerProps,
  };
  function handleTitleDbClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    if (!showFullscreen) return;
    e.stopPropagation();
    toggleFullscreen();
  }
  return <ModalHeader {...propsValue} />;
}

export function renderClose(
  props: BasicModalProps,
  innerProps: ModalInnerProps,
) {
  const { closeIconProps, onCancel } = props;
  const {
    fullScreen: [isFullscreen, { toggle: toggleFullscreen }],
    instance: { closeModal },
  } = innerProps;
  const propsValue: ModalCloseProps = {
    isFullscreen,
    onFullScreen: toggleFullscreen,
    onCancel: handleCancel,
    ...closeIconProps,
  };
  // 取消事件
  function handleCancel(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e?.stopPropagation();
    // 过滤自定义关闭按钮的空白区域
    closeModal();
    onCancel?.(e);
  }
  return <ModalClose {...propsValue} />;
}
export function renderFooter(
  props: BasicModalProps,
  innerProps: ModalInnerProps,
) {
  const { footerProps = {}, onCancel } = props;
  const {
    okLoadingState,
    instance: { closeModal },
  } = innerProps;
  const { okButtonProps = {}, ...rest } = footerProps;
  const propsValue: ModalFooterProps = {
    onCancel: handleCancel,
    okButtonProps: {
      ...okButtonProps,
      loading: okLoadingState,
      type: 'primary',
    },
    ...rest,
  };
  // 取消事件
  function handleCancel(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e?.stopPropagation();
    // 过滤自定义关闭按钮的空白区域
    closeModal();
    onCancel?.(e);
  }
  return <ModalFooter {...propsValue} />;
}
