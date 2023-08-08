import { RedoOutlined } from '@ant-design/icons';
import { Tooltip, TooltipProps } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export type RedoSettingProps = Partial<TooltipProps> & {
  redo?: () => void;
};

export const RedoSetting: React.FC<RedoSettingProps> = ({
  redo,
  getPopupContainer,
}) => (
  <Tooltip
    className="cursor-pointer"
    placement="top"
    getPopupContainer={getPopupContainer}
    title={
      <span>
        <FormattedMessage id="components.common.refresh" />
      </span>
    }
  >
    <RedoOutlined onClick={redo} />
  </Tooltip>
);
