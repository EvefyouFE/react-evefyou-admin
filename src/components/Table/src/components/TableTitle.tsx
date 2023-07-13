import { BasicTittle } from "@/components/Basic"
import { is } from "ramda"
import { useMemo } from "react"
import { TableTitleProps } from "../props"

export const TableTitle: React.FC<TableTitleProps> = ({
    title,
    getSelectRows = () => [],
    helpMessage,
}) => {
    const getTitle = useMemo(() => {
        if (is(Function, title)) {
          return title({
            selectRows: getSelectRows(),
          });
        }
        return title;
    }, [title, getSelectRows])

    return (
        <BasicTittle className="flex items-center justify-between" helpMessage={helpMessage} >
            {getTitle}
        </BasicTittle>
    )
}