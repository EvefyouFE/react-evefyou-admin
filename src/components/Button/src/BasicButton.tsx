
import { Icon } from "@/components/Icon";
import { useNativeProps } from "@/hooks";
import { Button } from "antd";
import classNames from "classnames";
import { is } from "ramda";
import { FC, PropsWithChildren, memo, useMemo, useRef } from "react";
import { ButtonProps } from "./props";

export const BasicButton: FC<PropsWithChildren<ButtonProps>> = ({
    preIcon,
    postIcon,
    color = '',
    iconSize=14,
    children,
    ...rest
}) => {
    const { disabled } = rest;
    const getButtonClass = useMemo(() => {
        return classNames([
            {
                [`ant-btn-${color}`]: !!color,
                [`is-disabled`]: disabled,
            },
        ]);
    }, [color, disabled]);

    const nativeProps = useNativeProps(rest, { excludeDefaultKeys: false })

    return (
        <Button className={getButtonClass} {...nativeProps} color={color}>
            {preIcon && <Icon icon={preIcon} size={iconSize} />}
            {children}
            {postIcon && <Icon icon={postIcon} size={iconSize} />}
        </Button>
    )
}
