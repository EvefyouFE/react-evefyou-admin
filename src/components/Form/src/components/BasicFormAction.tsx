import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { BasicFormActionProps } from "../props";

export function BasicFormAction({
    expand,
    showExpand = false,
    showReset = true,
    showSubmit = true,
    submitBtnOptions,
    resetBtnOptions,
    onExpand,
    size = 'small',
    textAlign = 'right',
    renderSubmitBefore,
    renderExpandBefore,
    renderExpandAfter,
    renderResetBefore,
}: BasicFormActionProps) {
    const { resetFields, } = Form.useFormInstance();
    const submitBtnPropsMemo = useMemo(() => ({
        text: <FormattedMessage id="components.common.search" />,
        ...submitBtnOptions
    }), [submitBtnOptions])
    const resetBtnPropsMemo = useMemo(() => ({
        text: <FormattedMessage id="components.common.reset" />,
        ...resetBtnOptions
    }), [resetBtnOptions])
    return (
        <div style={{ textAlign: textAlign }}>
            <Space size={size}>
                {renderSubmitBefore}
                {
                    showSubmit && (
                        <Button
                            type="primary"
                            htmlType="submit"
                            {...submitBtnPropsMemo}
                        >
                            {submitBtnPropsMemo.text}
                        </Button>
                    )
                }
                {renderResetBefore}
                {
                    showReset && (
                        <Button
                            onClick={() => {
                                resetFields();
                            }}
                            {...resetBtnPropsMemo}
                        >
                            {resetBtnPropsMemo.text}
                        </Button>
                    )
                }
                {renderExpandBefore}
                {
                    showExpand && (
                        <Button
                            type="link"
                            size="small"
                            onClick={onExpand}
                            icon={<DownOutlined rotate={expand ? 180 : 0} />}
                        >
                            <FormattedMessage id={expand ? "components.form.action.expand" : "components.form.action.unExpand"} />
                        </Button>
                    )
                }
                {renderExpandAfter}
            </Space>
        </div>
    )
}