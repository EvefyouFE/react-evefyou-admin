import { Spin } from 'antd';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

export const LoadingFallback: FC = () => (
  <div className="flex justify-center items-center h-full">
    <Spin size="large" spinning>
      <FormattedMessage
        id="layout.suspense.fallback.loading.tip"
        defaultMessage="loading..."
      />
    </Spin>
  </div>
);
