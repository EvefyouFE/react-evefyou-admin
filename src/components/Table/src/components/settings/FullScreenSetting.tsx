import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Tooltip, TooltipProps } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useTableContext } from '../../context';

export type FullScreenSettingProps = Partial<TooltipProps>;

export const FullScreenSetting: React.FC<FullScreenSettingProps> = ({
  getPopupContainer,
}) => {
  const { getElement } = useTableContext();
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(getElement);
  return (
    <Tooltip
      placement="top"
      getPopupContainer={getPopupContainer}
      title={
        <span>
          <FormattedMessage id="components.common.fullScreen" />
        </span>
      }
    >
      {isFullscreen ? (
        <FullscreenExitOutlined onClick={toggleFullscreen} />
      ) : (
        <FullscreenOutlined onClick={toggleFullscreen} />
      )}
    </Tooltip>
  );
};
