import classNames from "classnames";
import React from "react";
import { TableSettingProps } from "../../props";
import './TableSetting.less'
import { useDesign } from "@/hooks/design";

export const TableSetting: React.FC<TableSettingProps> = ({
    items,
}) => {
    const { prefixCls } = useDesign('table-setting')
    if (!items) return null;
    const clsName = classNames(prefixCls, 'flex space-x-2 mx-3')
    return (
        <div className={clsName} >
            {items.map(item => item)}
        </div>
    )
}

