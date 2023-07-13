import { Spin } from "antd";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

export interface LoadingFallbackProps {
}

export const LoadingFallback: FC<LoadingFallbackProps> = (props) => {
    return (
        <div className="flex justify-center items-center h-full">
            <Spin
                size="large"
                spinning={true}
                 >
                <FormattedMessage id="layout.suspense.fallback.loading.tip" defaultMessage={"loading..."}/>
            </Spin>
        </div>
    )
}
