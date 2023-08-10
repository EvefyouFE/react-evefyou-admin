import { SettingOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Checkbox, Popover, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import classNames from 'classnames';
import { clone, is, omit } from 'ramda';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useUnmountEffect } from "react-evefyou-hooks";
import { FormattedMessage } from 'react-intl';
import { ColumnChangeParam } from '../../types/table';
import { ScrollContainer } from '@/components/Containers';
import { useTableContext } from '../../context';
import { useDesign } from '@/hooks/design';
import './ColumnSetting.less';
import { PlainOptionNode } from './PlainOptionNode';
import { getPopupContainer as getParentPopupContainer } from '@/utils/dom';
import {
  CheckListState,
  ColumnSettingProps,
  PlainOption,
} from './ColumnSettingType';

const DEFALT_CHECK_LIST_STATE: CheckListState = {
  checkAll: true,
  checkedList: [],
  defaultCheckList: [],
};

/* eslint-disable */
export const ColumnSetting: React.FC<ColumnSettingProps> = ({
  getPopupContainer,
  onColumnsChange,
}) => {
  const columnListRef = useRef<HTMLDivElement>(null);
  const [checkListState, setCheckListState] = useState<CheckListState>(
    DEFALT_CHECK_LIST_STATE,
  );
  const { checkAll, checkedList, defaultCheckList } = checkListState;
  const [checkIndexState, setCheckIndexState] = useState(false);
  const [checkSelectState, setCheckSelectState] = useState(false);
  const [plainOptionsState, setPlainOptionsState] = useState<PlainOption[]>([]);
  const [cachePlainOptionsState, setCachePlainOptionsState] = useState<
    PlainOption[]
  >([]);
  const hasInit = useRef<boolean | null>(false);
  const { prefixCls } = useDesign('column-setting');
  const {
    getDefaultRowSelection,
    getColumns,
    getShowIndexColumn,
    setColumnsWithCache,
    setShowIndexColumn,
    setRowSelection,
  } = useTableContext();

  const indeterminateMemo = useMemo(() => {
    const len = plainOptionsState.length;
    const checkedLen = checkedList.length;
    return checkedLen > 0 && checkedLen < len;
  }, []);

  const defaultRowSelection = useMemo(
    () => getDefaultRowSelection(),
    [getDefaultRowSelection],
  );
  const columnsIgnoreIndexAndAction = useMemo(
    () => getColumns({ ignoreIndex: true, ignoreAction: true }),
    [getColumns],
  );

  const handleCheckAllChangeCb = useCallback(handleCheckAllChange, [
    plainOptionsState,
    checkedList,
  ]);
  const handleCheckIndexChangeCb = useCallback(handleCheckIndexChange, []);
  const handleCheckSelectChangeCb = useCallback(handleCheckSelectChange, [
    defaultRowSelection,
  ]);
  const resetCb = useCallback(reset, [
    checkListState,
    defaultCheckList,
    cachePlainOptionsState,
  ]);
  const handleColumnFixedCb = useCallback(handleColumnFixed, [checkedList]);
  const handlePlainOptionDragEndCb = useCallback(handlePlainOptionDragEnd, []);
  const handleCheckedListChangeCb = useCallback(handleCheckedListChange, [
    checkListState,
    plainOptionsState,
  ]);
  const getPopoverPopupContainerCb = useCallback(getPopoverPopupContainer, []);

  useUnmountEffect(() => {
    hasInit.current = null;
  });
  useEffect(() => {
    setTimeout(() => {
      if (!hasInit.current && columnsIgnoreIndexAndAction?.length) {
        init();
        hasInit.current = true;
      }
    }, 0);
  }, [columnsIgnoreIndexAndAction]);
  useEffect(() => {
    if (hasInit.current) {
      setColumnsWithCache(plainOptionsState);
      const data: ColumnChangeParam[] = plainOptionsState.map((col) => ({
        dataIndex: col.value,
        fixed: col.fixed,
        hidden: col.hidden ?? false,
      }));
      onColumnsChange?.(data);
    }
  }, [plainOptionsState]);
  useEffect(() => {
    const show = getShowIndexColumn();
    if (show !== checkIndexState) {
      setCheckIndexState(show);
    }
  }, [getShowIndexColumn]);
  useEffect(() => {
    const show = !!defaultRowSelection;
    if (show !== checkSelectState) {
      setCheckSelectState(show);
    }
  }, [defaultRowSelection]);

  function init() {
    const plainOptionColumns = columnsIgnoreIndexAndAction
      ?.filter((item) =>
        item?.show
          ? is(Function, item?.show)
            ? item?.show(item)
            : item?.show
          : true,
      )
      .reduce((acc, item) => {
        acc.push({
          label: is(Function, item.title) ? item.title({}) : item.title,
          value: item.key,
          key: item.key,
          dataIndex: item.dataIndex,
          hidden: item.hidden,
          fixed: item.fixed,
        });
        return acc;
      }, [] as PlainOption[]);
    if (!plainOptionsState.length) {
      setPlainOptionsState(plainOptionColumns);
      setCachePlainOptionsState(clone(plainOptionColumns));
    } else {
      plainOptionsState.forEach((item) => {
        const findItem = plainOptionColumns.find(
          (col) => col.dataIndex === item.dataIndex,
        );
        if (findItem) {
          item.fixed = findItem.fixed;
        }
      });
    }
    const checkList = columnsIgnoreIndexAndAction
      ?.map((item) => {
        if (item.hidden) {
          return '';
        }
        return item.dataIndex || item.title;
      })
      .filter(Boolean) as string[];
    const newCheckListState: CheckListState = {
      ...checkListState,
      checkedList: checkList,
      defaultCheckList: checkList,
    };
    setCheckListState(newCheckListState);
  }
  function getPopoverPopupContainer(triggerNode: HTMLElement) {
    return is(Function, getPopupContainer)
      ? getPopupContainer(triggerNode)
      : getParentPopupContainer();
  }
  function handlePlainOptionDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id) {
      setPlainOptionsState((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  }
  function handleCheckAllChange(e: CheckboxChangeEvent) {
    const chAll = e.target.checked;
    const checkList = plainOptionsState.map((item) => item.value);
    setCheckListState({
      ...checkListState,
      checkAll: chAll,
      checkedList: chAll ? checkList : [],
    });
    setPlainOptionsState((ops) =>
      ops.map((op) => {
        op.hidden = !chAll;
        return op;
      }),
    );
  }
  function handleCheckIndexChange(e: CheckboxChangeEvent) {
    setShowIndexColumn(e.target.checked);
  }
  function handleCheckSelectChange(e: CheckboxChangeEvent) {
    setRowSelection(
      e.target.checked
        ? omit(['selectedRowKeys'], defaultRowSelection)
        : undefined,
    );
  }
  function reset() {
    setCheckListState({
      ...checkListState,
      checkedList: [...defaultCheckList],
      checkAll: true,
    });
    setPlainOptionsState(cachePlainOptionsState);
  }
  function handleCheckedListChange(checkedValues: CheckboxValueType[]) {
    setCheckListState({
      ...checkListState,
      checkAll: checkedValues.length === plainOptionsState.length,
      checkedList: checkedValues as React.Key[],
    });
    setPlainOptionsState((ops) =>
      ops.map((op) => {
        op.hidden = !(checkedValues as React.Key[]).includes(op.value);
        return op;
      }),
    );
  }
  function handleColumnFixed(item: PlainOption, fixed?: 'left' | 'right') {
    if (!checkedList.includes(item.value as string)) return;
    const isFixed = item.fixed === fixed ? false : fixed;
    setPlainOptionsState((ops) =>
      ops.map((op) => {
        if (item.value === op.value) {
          op.fixed = isFixed;
        }
        return op;
      }),
    );
  }

  const renderTitle = () => (
    <div className="flex items-center justify-between">
      <Checkbox
        indeterminate={indeterminateMemo}
        checked={checkAll}
        onChange={handleCheckAllChangeCb}
      >
        <FormattedMessage id="components.table.setting.columns.showAll" />
      </Checkbox>
      <Checkbox checked={checkIndexState} onChange={handleCheckIndexChangeCb}>
        <FormattedMessage id="components.table.setting.columns.showIndex" />
      </Checkbox>
      <Checkbox
        checked={checkSelectState}
        onChange={handleCheckSelectChangeCb}
        disabled={!defaultRowSelection}
      >
        <FormattedMessage id="components.table.setting.columns.showSelect" />
      </Checkbox>
      <Button size="small" type="link" onClick={resetCb}>
        <FormattedMessage id="components.common.reset" />
      </Button>
    </div>
  );
  const leftIconClassName = useCallback(
    (item: PlainOption) => {
      const active = item.fixed === 'left';
      const disabled = !checkedList.includes(item.value);
      return classNames(
        `${prefixCls}-fixed-left`,
        {
          active,
          disabled,
        },
        'text-[rgba(0,0,0,45%)] cursor-pointer',
      );
    },
    [checkedList],
  );
  const rightIconClassName = useCallback(
    (item: PlainOption) => {
      const active = item.fixed === 'right';
      const disabled = !checkedList.includes(item.value);
      return classNames(
        `${prefixCls}-fixed-right`,
        {
          active,
          disabled,
        },
        'text-[rgba(0,0,0,45%)] cursor-pointer transform rotate-180',
      );
    },
    [checkedList],
  );
  const renderContent = () => {
    const plainOptionNodes = plainOptionsState.map((item) => (
      <PlainOptionNode
        key={item.key}
        item={item}
        onFixed={handleColumnFixedCb}
        getPopupContainer={getPopupContainer}
        leftIconClassName={leftIconClassName}
        rightIconClassName={rightIconClassName}
      />
    ));
    return (
      <ScrollContainer className="w-full">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handlePlainOptionDragEndCb}
        >
          <SortableContext
            items={plainOptionsState.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Checkbox.Group
              ref={columnListRef}
              value={checkedList}
              onChange={handleCheckedListChangeCb}
            >
              {plainOptionNodes}
            </Checkbox.Group>
          </SortableContext>
        </DndContext>
      </ScrollContainer>
    );
  };
  return (
    <Tooltip
      className={prefixCls}
      placement="top"
      getPopupContainer={getPopupContainer}
      title={
        <span>
          <FormattedMessage id="components.table.setting.columns" />
        </span>
      }
    >
      <Popover
        placement="bottomLeft"
        trigger="click"
        overlayClassName="w-110"
        getPopupContainer={getPopoverPopupContainerCb}
        title={renderTitle()}
        content={renderContent()}
      >
        <SettingOutlined width="1em" height="1em" />
      </Popover>
    </Tooltip>
  );
};
