import { Tabs } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { ReminderListMemo, ReminderListTypeEnum } from "./ReminderList";
import { queryGetMessageList, queryGetNoticeList, queryGetTodoList } from "@/api";
import { BasicResult } from "@/components/Result";
import { useActiveItems } from "@/hooks/components/items";
import { TabItem, useTabs } from "@/hooks/components/tabs";

export const ReminderTabs: FC = () => {
    const [activeKey, items, { setItems, changeActiveKey: onChange }] = useActiveItems<TabItem>(ReminderListTypeEnum.notice);
    const { data: noticeListRes } = queryGetNoticeList.useQueryRes()
    const { data: messageListRes } = queryGetMessageList.useQueryRes()
    const { data: todoListRes } = queryGetTodoList.useQueryRes()
    const { getTabItem } = useTabs()

    const noticeItem = useMemo(() => getTabItem(
        ReminderListTypeEnum.notice,
        'layout.header.reminder.tabs.notice',
        '(#)'.replace('#', noticeListRes?.data?.totalNum?.toString() ?? '')
    ), [noticeListRes?.data?.totalNum, getTabItem])
    const messageItem = useMemo(() => getTabItem(
        ReminderListTypeEnum.message,
        'layout.header.reminder.tabs.message',
        '(#)'.replace('#', messageListRes?.data?.totalNum?.toString() ?? '')
    ), [messageListRes?.data?.totalNum, getTabItem])
    const todoItem = useMemo(() => getTabItem(
        ReminderListTypeEnum.todo,
        'layout.header.reminder.tabs.todo',
        '(#)'.replace('#', todoListRes?.data?.totalNum?.toString() ?? '')
    ), [todoListRes?.data?.totalNum, getTabItem])

    useEffect(() => {
        const getChildren = (code?: number) => (
            <BasicResult code={code}>
                <ReminderListMemo type={activeKey as ReminderListTypeEnum} />
            </BasicResult>
        )
        switch (activeKey) {
            case ReminderListTypeEnum.notice:
                noticeItem.children = getChildren(noticeListRes?.code)
                break;
            case ReminderListTypeEnum.message:
                messageItem.children = getChildren(messageListRes?.code)
                break;
            case ReminderListTypeEnum.todo:
            default:
                todoItem.children = getChildren(todoListRes?.code)
                break;
        }
        setItems([noticeItem, messageItem, todoItem])
    }, [activeKey, messageItem, messageListRes?.code, noticeItem, noticeListRes?.code, todoItem, todoListRes?.code])

    return (
        <Tabs
            className="w-80"
            defaultActiveKey={ReminderListTypeEnum.notice}
            activeKey={activeKey}
            onChange={onChange}
            items={items}
        />
    )
}