import { BasicForm, BasicFormInstance, BasicFormProps } from "@/components/Form"
import { ModalContextData, ModalInstance } from "@/components/Modal"
import { TableActionItem } from "@/components/Table"
import { TableAction } from "@/components/Table/src/components/TableAction"
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons"
import { Project } from "@models/index"
import { modalItems } from "./list.data"
import { useMemo } from "react"
import { useCompInstance } from "@/hooks"
import { Button } from "antd"
import { formatById } from "@/locales"

export function renderActionFn(modalInstance: Partial<ModalInstance>) {
    const {
        openModal
    } = modalInstance;
    function renderAction(value: any, record: Project, index: number) {
        function handleEditOnClick(value: any, record: Project, index: number) {
            const data: ModalContextData = {
                record,
                isUpdate: true
            }

            openModal?.(true, data)
        }
        function handleDeleteOnClick(value: any, record: Project, index: number) {

        }
        const items: TableActionItem[] = [
            {
                key: 'project-action-edit',
                icon: <EditOutlined />,
                onClick: () => handleEditOnClick(value, record, index),
            },
            {
                key: 'project-action-delete',
                icon: <DeleteTwoTone twoToneColor={'red'} />,
                popConfirmProps: {
                    title: '是否确认删除',
                    placement: 'left',
                    color: 'error',
                    onConfirm: () => handleDeleteOnClick.bind(null, record),
                }
            },
        ]
        return (<TableAction items={items} />)
    }
    return renderAction
}

export function renderToolbar() {
    return (
      <Button type="primary">
        {formatById('view.add', { target: formatById('view.project') })}
      </Button>
    )
}