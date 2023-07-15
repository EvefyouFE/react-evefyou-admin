import { useLocale } from "@/locales"
import { Popconfirm } from "antd"
import { FC, useMemo } from "react"
import { BasicButton } from "./BasicButton"
import { PopConfirmButtonProps } from "./props"

export const PopConfirmButton: FC<PopConfirmButtonProps> = (props) => {
  const {
    popconfirmProps,
    color,
    disabled,
    ...rest
  } = props
  const { formatById } = useLocale()

  const popconfirmPropsMemo = popconfirmProps && useMemo(() => ({
    okText: formatById('components.button.okText'),
    cancelText: formatById('components.button.cancelText'),
    ...popconfirmProps,
  }), [popconfirmProps]);

  const buttonProps = useMemo(() => ({
    color: (color && disabled) ? '' : color,
    disabled,
    ...rest
  }), [props]);

  return popconfirmPropsMemo
    ? (
      <Popconfirm {...popconfirmPropsMemo}>
        <BasicButton {...buttonProps} ></BasicButton>
      </Popconfirm>
    )
    : (
      <BasicButton {...rest}></BasicButton>
    )
}
