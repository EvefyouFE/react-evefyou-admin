import { Col, Form } from 'antd';
import { FC, memo, useMemo } from 'react';
import { BasicFormItemProps } from '../props';
import { Item } from './render';
import { deepCompareObj } from '@/utils/object';

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
