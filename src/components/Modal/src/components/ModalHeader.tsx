import { BasicTittle } from "@/components/Basic";
import { FC } from "react";
import { ModalHeaderProps } from "../props";

export const ModalHeader: FC<ModalHeaderProps> = ({
    helpMessage,
    title,
    onDoubleClick,
    onMouseOver,
    onMouseOut,
}) => {
    return (
        <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            <BasicTittle helpMessage={helpMessage} onDoubleClick={onDoubleClick} className="items-center">
                {title}
            </BasicTittle>
        </div>
    )
}