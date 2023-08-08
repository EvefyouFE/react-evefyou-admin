import { Button, Result } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { formatById } from '@/locales';

interface ForbiddenResultProps {
  back?: string;
  title?: string;
  subTitle?: string;
  btnName?: string;
}

export const ForbiddenResult: FC<ForbiddenResultProps> = ({
  back,
  title,
  subTitle,
  btnName,
}) => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title={title ?? formatById('result.403.title')}
      subTitle={subTitle ?? formatById('result.403.sub.title')}
      extra={
        <Button type="primary" onClick={() => navigate(back ?? '/')}>
          {btnName ?? formatById('result.common.backLogin')}
        </Button>
      }
    />
  );
};
