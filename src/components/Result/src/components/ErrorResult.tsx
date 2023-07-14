import { useLocale } from "@/locales";
import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

interface ErrorResultProps {
    back?: string
    title?: string
    subTitle?: string
    btnName?: string
}

export const ErrorResult: FC<ErrorResultProps> = ({back,title,subTitle,btnName}) => {
    const {formatById} = useLocale();
    const navigate = useNavigate();
    return (
        <Result
            status="500"
            title={title ?? formatById('result.error.title')}
            subTitle={subTitle ?? formatById('result.error.sub.title')}
            extra={<Button type="primary" onClick={() => navigate(back ?? '/')}>{btnName ?? formatById('result.common.backhome')}</Button>}
        />
    )
}