/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Form\src\components\BasicFormAction.tsx
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
 */
import { DownOutlined } from '@ant-design/icons';
import { deepCompareObj } from 'react-evefyou-hooks';
import { Button, Form, Space } from 'antd';
import { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { BasicFormActionProps } from '../props';

export function BasicFormActionFn({
  expand,
  showExpand = false,
  showReset = true,
  showSubmit = true,
  submitBtnOptions,
  resetBtnOptions,
  onExpand,
  size = 'small',
  textAlign = 'right',
  renderSubmitBefore,
  renderExpandBefore,
  renderExpandAfter,
  renderResetBefore,
}: BasicFormActionProps) {
  const { resetFields } = Form.useFormInstance();
  const submitBtnPropsMemo = useMemo(
    () => ({
      text: <FormattedMessage id="components.common.search" />,
      ...submitBtnOptions,
    }),
    [submitBtnOptions],
  );
  const resetBtnPropsMemo = useMemo(
    () => ({
      text: <FormattedMessage id="components.common.reset" />,
      ...resetBtnOptions,
    }),
    [resetBtnOptions],
  );

  return (
    <div style={{ textAlign }}>
      <Space size={size}>
        {renderSubmitBefore}
        {showSubmit && (
          <Button type="primary" htmlType="submit" {...submitBtnPropsMemo}>
            {submitBtnPropsMemo.text}
          </Button>
        )}
        {renderResetBefore}
        {showReset && (
          <Button
            onClick={() => {
              resetFields();
            }}
            {...resetBtnPropsMemo}
          >
            {resetBtnPropsMemo.text}
          </Button>
        )}
        {renderExpandBefore}
        {showExpand && (
          <Button
            type="link"
            size="small"
            onClick={onExpand}
            icon={<DownOutlined rotate={expand ? 180 : 0} />}
          >
            <FormattedMessage
              id={
                expand
                  ? 'components.form.action.expand'
                  : 'components.form.action.unExpand'
              }
            />
          </Button>
        )}
        {renderExpandAfter}
      </Space>
    </div>
  );
}

export const BasicFormAction = memo(BasicFormActionFn, deepCompareObj);
