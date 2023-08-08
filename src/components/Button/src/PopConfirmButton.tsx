import { Popconfirm } from "antd"
import { FC, useMemo } from "react"
import { BasicButton } from "./BasicButton"
import { formatById } from "@/locales"
import { PopConfirmButtonProps } from "./props"

export const PopConfirmButton: FC<PopConfirmButtonProps> = (props) => {
  const {
    popconfirmProps,
    color,
    disabled,
    ...rest
  } = props

  const popconfirmPropsMemo = popconfirmProps && {
    okText: formatById('components.button.okText'),
    cancelText: formatById('components.button.cancelText'),
    ...popconfirmProps,
  };

  const buttonProps = {
    color: (color && disabled) ? '' : color,
    disabled,
    ...rest
  };

  return popconfirmPropsMemo
    ? (
      <Popconfirm {...popconfirmPropsMemo}>
        <BasicButton {...buttonProps} />
      </Popconfirm>
    )
    : (
      <BasicButton {...rest} />
    )
}
