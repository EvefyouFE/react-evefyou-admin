/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Form\src\components\BasicFormItem.tsx
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
 */
import { Col, Form } from 'antd';
import { deepCompareObj } from 'react-evefyou-hooks';
import { FC, memo, useMemo } from 'react';
import { BasicFormItemProps } from '../props';
import { Item } from './render';

export const BasicFormItemFn: FC<BasicFormItemProps> = (
  props: BasicFormItemProps,
) => {
  const {
    formProps,
    colProps,
    itemProps = {},
    canRender = true,
    hidden = false,
    renderColContent,
  } = props;

  const { getFieldsValue } = Form.useFormInstance();

  const renderCallbackParams = useMemo(
    () => ({
      props: itemProps,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      values: getFieldsValue(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      field: itemProps?.name?.toString() || '',
    }),
    [itemProps, getFieldsValue],
  );

  const itemInnerProps = {
    ...itemProps,
    renderCallbackParams,
  };

  const colContent = renderColContent ? (
    renderColContent(renderCallbackParams)
  ) : (
    <Item {...itemInnerProps} />
  );

  const colPropsValue = {
    ...formProps?.baseColProps,
    ...colProps,
  };

  return canRender ? (
    <Col {...colPropsValue} hidden={hidden}>
      {colContent}
    </Col>
  ) : null;
};

export const BasicFormItem = memo(BasicFormItemFn, deepCompareObj);
