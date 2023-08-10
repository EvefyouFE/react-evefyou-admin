/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\pages\components\Reminder\ReminderList.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { List } from 'antd';
import classNames from 'classnames';
import { FC, memo, useMemo } from 'react';
import {
  queryGetMessageList,
  queryGetNoticeList,
  queryGetTodoList,
} from '@/api';
import { Icon } from '@/components/Icon';
import { useList } from '@/hooks/components/list';

export interface ReminderListDataItem {
  icon?: string;
  title: string;
  description?: string;
  createTime?: string;
  state?: number;
  stateDesc?: string;
}
// eslint-disable-next-line react-refresh/only-export-components
export enum ReminderListTypeEnum {
  notice = '1',
  message = '2',
  todo = '3',
}

interface ReminderListProps extends PropsWithCls {
  type: ReminderListTypeEnum;
}

export const ReminderList: FC<ReminderListProps> = ({ type, className }) => {
  const { current, onChange } = useList();
  const pageSize = 3;
  const params = { current, pageSize };

  const { data: noticeListRes } = queryGetNoticeList.useQuery({ params });
  const { data: messageListRes } = queryGetMessageList.useQuery({ params });
  const { data: todoListRes } = queryGetTodoList.useQuery({ params });

  const data = useMemo(() => {
    switch (type) {
      case ReminderListTypeEnum.notice:
        return noticeListRes?.resultData;
      case ReminderListTypeEnum.message:
        return messageListRes?.resultData;
      case ReminderListTypeEnum.todo:
      default:
        return todoListRes?.resultData;
    }
  }, [
    messageListRes?.resultData,
    noticeListRes?.resultData,
    todoListRes?.resultData,
    type,
  ]);

  const rootClsName = classNames(
    className,
    'w-full border border-solid border-neutral-300',
  );
  const itemIconClsName = classNames(
    'h-full',
    'w-16 flex-none flex items-center justify-center',
  );
  const itemContentClsName = classNames(
    'h-full',
    'flex-1 flex flex-col justify-center items-start pl-4',
  );
  const itemContentStateClsName = classNames(
    'text-xs border border-solid py-0 px-4',
  );
  const getStateClsName = (state: number) => {
    switch (state) {
      case 0:
        return 'bg-orange-100 border-orange-500 text-orange-500';
      case 1:
        return 'bg-orange-100 border-orange-500 text-orange-500';
      case 2:
        return 'bg-orange-100 border-orange-500 text-orange-500';
      default:
        return 'bg-orange-100 border-orange-500 text-orange-500';
    }
  };
  return (
    <List
      className={rootClsName}
      pagination={{
        position: 'bottom',
        align: 'center',
        onChange,
        ...params,
      }}
      dataSource={data}
      renderItem={(item: ReminderListDataItem) => (
        <List.Item
          className="flex w-full min-h-24 items-center justify-between"
          key={item.title}
        >
          {item.icon ? (
            <span className={itemIconClsName}>
              <Icon icon={item.icon} />
            </span>
          ) : undefined}
          <span className={itemContentClsName}>
            {item.title ? (
              <span className="flex-3 flex flex-col justify-center items-start">
                {item.title}
              </span>
            ) : undefined}
            {item.state && item.stateDesc ? (
              <span
                className={`${itemContentStateClsName} ${getStateClsName(
                  item.state,
                )}`}
              >
                {item.stateDesc}
              </span>
            ) : undefined}
            {item.description ? (
              <span className="flex-3 flex flex-col justify-center items-start">
                {item.description}
              </span>
            ) : undefined}
            {item.createTime ? (
              <span className="flex-3 flex flex-col justify-center items-start">
                {item.createTime}
              </span>
            ) : undefined}
          </span>
        </List.Item>
      )}
    />
  );
};

export const ReminderListMemo = memo(ReminderList);
