import { getPopupContainer } from "@/utils/dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { is } from "ramda";
import React, { Children, PropsWithChildren } from "react";
import './BasicHelp.less';
import { BasicHelpProps } from "./props";
import { useDesign } from "@/hooks/design";

export const BasicHelp: React.FC<PropsWithChildren<BasicHelpProps>> = ({
    text,
    showIndex,
    color,
    fontSize = '14px',
    maxWidth = '600px',
    placement = 'right',
    children,
    ...rest
}) => {
    const {prefixCls} = useDesign('basic-help')
    const getTooltipStyle = { color, fontSize };
    const getOverlayStyle = { maxWidth };
    function renderTitle() {
        const textList = text;

        if (is(String, textList)) {
            return <p>{textList}</p>;
        }

        if (is(Array, textList)) {
            return textList.map((text, index) => {
                return (
                    <p key={text}>
                        <>
                            {showIndex ? `${index + 1}. ` : ''}
                            {text}
                        </>
                    </p>
                );
            });
        }
        return null;
    }
    return (
        <Tooltip
            overlayClassName={`${prefixCls}__wrap`}
            title={<div style={getTooltipStyle}>{renderTitle()}</div>}
            autoAdjustOverflow
            overlayStyle={getOverlayStyle}
            placement={placement}
            getPopupContainer={() => getPopupContainer()}
            {...rest}
        >
            <span className={prefixCls}>
                {
                    Children ? children : <InfoCircleOutlined/>
                }
            </span>
        </Tooltip>
    )
}