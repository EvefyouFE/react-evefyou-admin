import { BasicResult } from "@/components/Result";
import { TabItem, useActiveItems, useTabs } from "@/hooks";
import { queryGetMessageList, queryGetNoticeList, queryGetTodoList } from "@api/query";
import { ResCode } from "@models/base";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "antd";
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { ReminderListMemo, ReminderListTypeEnum } from "./ReminderList";

interface ReminderTabItemProps extends PropsWithChildren {
}

export const ReminderTabs: FC<ReminderTabItemProps> = ({
}) => {
    const [activeKey, items, { setItems, changeActiveKey: onChange }] = useActiveItems<TabItem>(ReminderListTypeEnum.notice);
    const { data: noticeListRes } = useQuery(queryGetNoticeList())
    const { data: messageListRes } = useQuery(queryGetMessageList())
    const { data: todoListRes } = useQuery(queryGetTodoList())
    const { getTabItem } = useTabs()

    const noticeItem = useMemo(() => {
        return getTabItem(ReminderListTypeEnum.notice, 'layout.header.reminder.tabs.notice', '(#)'.replace('#', noticeListRes?.data.totalNum + ''))
    }, [noticeListRes?.data.totalNum])
    const messageItem = useMemo(() => {
        return getTabItem(ReminderListTypeEnum.message, 'layout.header.reminder.tabs.message', '(#)'.replace('#', messageListRes?.data.totalNum + ''))
    }, [messageListRes?.data.totalNum])
    const todoItem = useMemo(() => {
        return getTabItem(ReminderListTypeEnum.todo, 'layout.header.reminder.tabs.todo', '(#)'.replace('#', todoListRes?.data.totalNum + ''))
    }, [todoListRes?.data.totalNum])

    const getChildren = (code?: ResCode) => {
        return (
            <BasicResult code={code}>
                <ReminderListMemo type={activeKey as ReminderListTypeEnum} />
            </BasicResult>
        );
    }

    useEffect(() => {
        switch (activeKey) {
            case ReminderListTypeEnum.notice:
                noticeItem.children = getChildren(noticeListRes?.code)
                break;
            case ReminderListTypeEnum.message:
                messageItem.children = getChildren(messageListRes?.code)
                break;
            case ReminderListTypeEnum.todo:
                todoItem.children = getChildren(todoListRes?.code)
                break;
        }
        setItems([noticeItem, messageItem, todoItem])
    }, [activeKey])

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