import { AlertOutlined } from "@ant-design/icons";
import { Badge, Popover, Spin } from "antd";
import { FC, Suspense } from "react";
import { ReminderTabs } from "./ReminderTabs";
import './index.less'
import { useDesign } from "@/hooks";
import classNames from "classnames";

export const Reminder: FC<PropsWithCls> = ({
    className
}) => {
    const {prefixCls} = useDesign('reminder')
    const rootClsName = classNames(className, prefixCls)
    return (
        <Popover 
            className={rootClsName} 
            placement="bottom" 
            content={(
                <Suspense fallback={<Spin />}>
                    <ReminderTabs/>
                </Suspense>
            )}
            trigger="click"
        >
            <span>
                <Badge className="inline-flex items-center h-8" dot>
                    <AlertOutlined className="px-2"/>
                </Badge>
            </span>
        </Popover>
    )
}