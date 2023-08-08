import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';
import React, { useEffect } from 'react';

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
  onActiveBarTransform: (className: string) => void;
}

export const DraggableTabNode = ({
  className,
  onActiveBarTransform,
  ...props
}: DraggableTabPaneProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({
    id: props['data-node-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    // cursor: 'move',
  };

  useEffect(() => {
    if (!isSorting) {
      onActiveBarTransform('');
    } else if (className?.includes('ant-tabs-tab-active')) {
      onActiveBarTransform(css`
        .ant-tabs-ink-bar {
          transform: ${CSS.Transform.toString(transform)};
          transition: ${transition} !important;
        }
      `);
    }
  }, [className, isSorting, onActiveBarTransform, transform, transition]);

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};
