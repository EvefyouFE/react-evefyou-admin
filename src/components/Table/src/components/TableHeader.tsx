import { Divider } from "antd"
import React from "react"
import { TableHeaderProps } from "../props"

// eslint-disable-next-line react/display-name
export const TableHeader = React.forwardRef(({
    renderTableTitle,
    renderTableSetting,
    renderHeaderTop,
    renderToolbar
}: TableHeaderProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <div ref={ref}>
        {
            renderHeaderTop && (
                <div className="m-1">{renderHeaderTop}</div>
            )
        }
        <div className="flex items-center">
            {renderTableTitle}
            <div className="flex-1 flex items-center justify-end">
                {renderToolbar}
                {renderToolbar && renderTableSetting && (
                    <Divider type="vertical" />
                )}
                {renderTableSetting}
            </div>
        </div>
    </div>
)) as (props: TableHeaderProps & { ref?: React.ForwardedRef<HTMLDivElement> }) => JSX.Element;


export const TableHeaderMemo = React.memo(TableHeader) as typeof TableHeader