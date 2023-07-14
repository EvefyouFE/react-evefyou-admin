import { localeConfigs } from "@/config";
import { localeSelector } from "@/stores";
import { PropsWithCls } from "@/types/base";
import { TranslationOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useRecoilState } from "recoil";

interface LocaleDropdownProps extends PropsWithCls {

}

export const LocaleDropdown: FC<LocaleDropdownProps> = ({
    className
}) => {
    const [,setLocale] = useRecoilState(localeSelector)

    const items = localeConfigs.map((v) => ({
        key: v.key,
        label: (
            <span onClick={() => {setLocale(v.key)}}>
                <FormattedMessage id={v.key}/>
            </span>
        )
    }))

    return (
        <Dropdown 
            menu={{ items }} 
            placement="bottom" 
            arrow={{ pointAtCenter: true }}
            className={className}
        >
            <span className="cursor-pointer flex items-center">
                <TranslationOutlined />
            </span>
        </Dropdown>
    )
}