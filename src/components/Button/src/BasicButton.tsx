/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Button\src\BasicButton.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { Button } from 'antd';
import classNames from 'classnames';
import { FC, PropsWithChildren, useMemo } from 'react';
import { ButtonProps } from './props';
import { Icon } from '@/components/Icon';
import { useNativeProps } from "@/hooks/core";

export const BasicButton: FC<PropsWithChildren<ButtonProps>> = ({
  preIcon,
  postIcon,
  color = '',
  iconSize = 14,
  children,
  ...rest
}) => {
  const { disabled } = rest;
  const getButtonClass = useMemo(
    () =>
      classNames([
        {
          [`ant-btn-${color}`]: !!color,
          [`is-disabled`]: disabled,
        },
      ]),
    [color, disabled],
  );

  const nativeProps = useNativeProps(rest, { excludeDefaultKeys: false });

  return (
    <Button className={getButtonClass} {...nativeProps} color={color}>
      {preIcon && <Icon icon={preIcon} size={iconSize} />}
      {children}
      {postIcon && <Icon icon={postIcon} size={iconSize} />}
    </Button>
  );
};
