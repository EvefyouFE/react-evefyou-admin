import { Col, Form, FormItemProps } from "antd";
import { FC, useMemo } from "react";
import { BasicFormItemProps } from "../props";
import { Item } from "./render";
import { is, omit } from "ramda";



export const BasicFormItem: FC<BasicFormItemProps> = (props: BasicFormItemProps) => {
    const {
        formProps,
        colProps,
        itemProps = {},
        canRender = true,
        hidden = false,
        renderColContent,
    } = props;

    const { getFieldsValue } = Form.useFormInstance()

    const renderCallbackParams = useMemo(() => ({
        props: itemProps,
        values: getFieldsValue(),
        field: itemProps?.name?.toString() || ''
    }), [itemProps, getFieldsValue])

    const itemInnerProps = {
        ...itemProps,
        renderCallbackParams,
    }

    const colContent = renderColContent
        ? renderColContent(renderCallbackParams)
        : <Item {...itemInnerProps} />

    const colPropsValue = {
        ...formProps?.baseColProps,
        ...colProps,
    }

    return canRender ? (
        <Col {...colPropsValue} hidden={hidden}>
            {colContent}
        </Col>
    ) : null;
}