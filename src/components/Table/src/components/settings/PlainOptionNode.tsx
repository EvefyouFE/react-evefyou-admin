import { Icon } from "@/components/Icon";
import { getPopupContainer as getParentPopupContainer } from '@/utils';
import { DragOutlined, SettingOutlined } from "@ant-design/icons";
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Button, Checkbox, Divider, Popover, Tooltip } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import classNames from "classnames";
import { is, omit } from "ramda";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { TableColumnProps, TableColumnPropsWithKey } from "../../props";
import { ColumnChangeParam } from "../../types";
import { ScrollContainer } from "@/components/Containers";
import { useTableContext } from "../../BasicTable";
import { useDesign, useMountEffect, useUnmountEffect } from "@/hooks";
import './ColumnSetting.less';
import { CSS } from "@dnd-kit/utilities";
import { PlainOption } from "./ColumnSetting";

interface PlainOptionNodeProps {
    item: PlainOption;
    getPopupContainer: (triggerNode: HTMLElement) => HTMLElement;
    onFixed: (item: PlainOption, fixed?: 'left' | 'right') => void;
    leftIconClassName: (item: PlainOption) => string;
    rightIconClassName: (item: PlainOption) => string;
}

export const PlainOptionNode: FC<PlainOptionNodeProps> = ({
    item,
    getPopupContainer,
    onFixed,
    leftIconClassName,
    rightIconClassName,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.key,
    });
    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };
    return (
        <div
            ref={setNodeRef}
            key={item.value}
            className="flex items-center min-w-full pt-1 pb-2"
            style={style}
            {...attributes}
        >
            <DragOutlined
                className="pr-4 cursor-pointer"
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
            />
            <Checkbox value={item.value} className="w-full">
                {item.label}
            </Checkbox>
            <Tooltip
                placement="bottomLeft"
                mouseLeaveDelay={0.4}
                getPopupContainer={getPopupContainer}
                title={<FormattedMessage id="components.table.setting.columns.fixedLeft" />}
            >
                <Icon
                    icon="iconify:line-md:arrow-align-left"
                    className={leftIconClassName(item)}
                    width={'1.2em'}
                    height={'1.2em'}
                    onClick={() => onFixed(item, 'left')}
                />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip
                placement="bottomLeft"
                mouseLeaveDelay={0.4}
                getPopupContainer={getPopupContainer}
                title={<FormattedMessage id="components.table.setting.columns.fixedRight" />}
            >
                <Icon
                    icon="iconify:line-md:arrow-align-left"
                    className={rightIconClassName(item)}
                    width={'1.2em'}
                    height={'1.2em'}
                    onClick={() => onFixed(item, 'right')}
                />
            </Tooltip>
        </div>
    )
}