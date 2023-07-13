import { formatById } from "@/locales";
import { Button, Empty, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

interface NotExistResultProps {
    back?: string
    title?: string
    subTitle?: string
    btnName?: string
}

export const NotExistResult: FC<NotExistResultProps> = ({ back, title, subTitle, btnName }) => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title={title ?? formatById('result.404.title')}
            subTitle={subTitle ?? formatById('result.404.sub.title')}
            extra={<Button type="primary" onClick={() => navigate(back ?? '/')}>{btnName ?? formatById('result.common.backhome')}</Button>}
        />
    )
}