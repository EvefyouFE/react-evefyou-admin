import { Button } from 'antd';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { ModalFooterProps } from '../props';

export const ModalFooter: FC<ModalFooterProps> = ({
  cancelText,
  okText,
  okButtonProps,
  cancelButtonProps,
  insertFooter,
  centerFooter,
  appendFooter,
  onCancel,
}) => (
  <div className="flex items-center justify-center">
    {insertFooter}
    <Button onClick={onCancel} {...cancelButtonProps}>
      {cancelText || <FormattedMessage id="components.button.cancelText" />}
    </Button>
    {centerFooter}
    <Button {...okButtonProps}>
      {okText || <FormattedMessage id="components.button.okText" />}
    </Button>
    {appendFooter}
  </div>
);
