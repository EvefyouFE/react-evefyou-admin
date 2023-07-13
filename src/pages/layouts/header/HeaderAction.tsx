import { PropsWithCls } from "@/types/base";
import { LocaleDropdown, Reminder, UserDropdown } from "@pages/components";
import { FC } from "react";

export const HeaderAction: FC<PropsWithCls> = () => {
    const itemClsName = "flex justify-center items-center min-w-[2rem] h-full"
    return (
        <div className="flex items-center justify-around h-full">
            <Reminder className={`${itemClsName} cursor-pointer`} />
            <LocaleDropdown className={itemClsName} />
            <UserDropdown className={`${itemClsName} px-5`} />
        </div>
    )
}