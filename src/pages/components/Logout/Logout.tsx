import { useLogout } from "@/hooks"
import { FC } from "react"
import { FormattedMessage } from "react-intl"

interface LogoutProps {
    locale?: string
}

export const Logout: FC<LogoutProps> = ({
    locale
}) => {
    const {onLogout} = useLogout()
    return (
        <span onClick={onLogout}>
            <FormattedMessage id={locale} defaultMessage={"登出"}/>
        </span>
    )
}