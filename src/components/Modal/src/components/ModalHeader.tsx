import { FC } from 'react';
import { ModalHeaderProps } from '../props';
import { BasicTittle } from '@/components/Basic';

export const ModalHeader: FC<ModalHeaderProps> = ({
  helpMessage,
  title,
  onDoubleClick,
  onMouseOver,
  onMouseOut,
}) => (
  <div
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onFocus={() => onMouseOver?.()}
    onBlur={() => onMouseOut?.()}
  >
    <BasicTittle
      helpMessage={helpMessage}
      onDoubleClick={onDoubleClick}
      className="items-center"
    >
      {title}
    </BasicTittle>
  </div>
);
