import React from "react";
import { TableSettingProps } from "../../props";
import './TableSetting.less'
import classNames from "classnames";
import { useDesign } from "@/hooks";

export const TableSetting: React.FC<TableSettingProps> = ({
    items,
}) => {
    if(!items) return null;
    const {prefixCls} = useDesign('table-setting')
    const clsName = classNames(prefixCls, 'flex space-x-2 mx-3')
    return (
        <div className={clsName} >
            {items.map(item=>item)}
        </div>
    )
}

