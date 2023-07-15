import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
    horizontalListSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';
import { TabsProps } from 'antd';
import { FC } from 'react';
import { DraggableTabNode } from './DraggableTabNode';
import { TabItem } from '../type';

type RenderTabBar = Required<TabsProps>['renderTabBar']
type RenderTabBarProps = Parameters<RenderTabBar>[0]
type DefaultTabBar = Parameters<RenderTabBar>[1]

interface DndContextTabBarProps extends RenderTabBarProps {
    items: TabItem[];
    DefaultTabBar: DefaultTabBar;
    handleOnDragEnd: (event: DragEndEvent) => void
    handleOnActiveBarTransform: (className: string) => void
}

export const DndContextTabBar: FC<DndContextTabBarProps> = ({
    items,
    DefaultTabBar,
    handleOnDragEnd,
    handleOnActiveBarTransform,
    ...rest
}) => {
    const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
    const onActiveBarTransform = (className: string) => {handleOnActiveBarTransform(className)};
    const onDragEnd = (event: DragEndEvent) => {handleOnDragEnd(event)};

    return (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                <DefaultTabBar {...rest}>
                    {(node) => (
                        <DraggableTabNode
                            {...node.props}
                            key={node.key}
                            onActiveBarTransform={onActiveBarTransform}
                        >
                            {node}
                        </DraggableTabNode>
                    )}
                </DefaultTabBar>
            </SortableContext>
        </DndContext>
    )
}