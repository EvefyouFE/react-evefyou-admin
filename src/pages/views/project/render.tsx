import { DeleteTwoTone, EditOutlined } from "@ant-design/icons"
import { Project } from "@models/project"
import { Button } from "antd"
import { ModalContextData, ModalInstance } from "@/components/Modal"
import { TableActionItem } from "@/components/Table/src/types/table"
import { TableAction } from "@/components/Table/src/components/TableAction"
import { formatById } from "@/locales"

export function renderActionFn(modalInstance: Partial<ModalInstance>) {
    const {
        openModal
    } = modalInstance;
    function renderAction(value: Value, record: Project, index: number) {
        function handleEditOnClick(v: Value, rd: Project, idx: number) {
            console.debug(v, rd, idx)
            const data: ModalContextData = {
                record: rd,
                isUpdate: true
            }

            openModal?.(true, data)
        }
        function handleDeleteOnClick(v: Value, rd: Project, idx: number) {
            console.debug(v, rd, idx)
        }
        const items: TableActionItem[] = [
            {
                key: 'project-action-edit',
                icon: <EditOutlined />,
                onClick: () => handleEditOnClick(value, record, index),
            },
            {
                key: 'project-action-delete',
                icon: <DeleteTwoTone twoToneColor="red" />,
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