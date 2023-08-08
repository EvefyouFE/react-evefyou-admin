import { is } from 'ramda';
import { useMemo } from 'react';
import { BasicTittle } from '@/components/Basic';
import { TableTitleProps } from '../props';

export const TableTitle: React.FC<TableTitleProps> = ({
  title,
  getSelectRows,
  helpMessage = '',
}) => {
  const getTitle = useMemo(() => {
    if (is(Function, title)) {
      return (
        getSelectRows &&
        title({
          selectRows: getSelectRows(),
        })
      );
    }
    return title;
  }, [title, getSelectRows]);

  return (
    <BasicTittle
      className="flex items-center justify-between"
      helpMessage={helpMessage}
    >
      {getTitle}
    </BasicTittle>
  );
};
