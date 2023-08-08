import { Empty } from 'antd';
import { FC } from 'react';

interface EmptyResultProps {
  back?: string;
  title?: string;
  subTitle?: string;
  btnName?: string;
}

export const EmptyResult: FC<EmptyResultProps> = ({
  back,
  title,
  subTitle,
  btnName,
}) => {
  console.debug(back, title, subTitle, btnName);
  return <Empty />;
};
