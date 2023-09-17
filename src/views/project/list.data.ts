/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ColumnsType } from "antd/es/table"
import { BasicFormItemProps } from "react-evefyou-app"
import { Project } from "@models/project"
import { formatById } from "@/locales"

export const columns: ColumnsType<Project> = [
    {
        title: formatById('view.common.title'),
        dataIndex: 'title',
        width: '16rem',
        align: 'center',
        ellipsis: true,
    },
    {
        title: formatById('view.common.address'),
        dataIndex: 'address',
        width: '30rem',
        align: 'center',
    },
    {
        title: formatById('view.project.member'),
        dataIndex: 'memberId',
        width: '16rem',
        align: 'center',
        ellipsis: true,
    },
    {
        title: formatById('view.common.email'),
        dataIndex: 'email',
        align: 'center',
        ellipsis: true,
    },
    {
        title: formatById('view.project.stateDesc'),
        dataIndex: 'stateDesc',
        width: '10rem',
        align: 'center',
        sorter: (a, b) => a.state - b.state,
    },
    {
        title: formatById('view.common.createTime'),
        dataIndex: 'createTime',
        width: '10rem',
        align: 'center',
        sorter: (a, b) => (!a.createTime || !b.createTime)
            ? 0
            : new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    }
]

export const searchItems: BasicFormItemProps[] = [
    {
        itemProps: {
            name: 'title',
            label: formatById('view.common.title'),
            itemComponent: 'Input',
        }
    },
    {
        itemProps: {
            name: 'state',
            label: formatById('view.project.stateDesc'),
            itemComponent: 'Select',
            itemComponentProps: {
                options: [
                    {
                        value: '0',
                        label: '未开始',
                    },
                    {
                        value: '1',
                        label: '进行中',
                    },
                    {
                        value: '2',
                        label: '已结束',
                    },
                ],
            },
        }
    },
    {
        itemProps: {
            name: 'createTime',
            label: formatById('view.common.createTime'),
            itemComponent: 'RangePicker'
        }
    },
]

export const modalItems: BasicFormItemProps[] = [
    {
        itemProps: {
            name: 'title',
            label: formatById('view.common.title'),
            itemComponent: 'Input',
        }
    },
    {
        itemProps: {
            name: 'state',
            label: formatById('view.project.stateDesc'),
            itemComponent: 'Select',
            itemComponentProps: {
                options: [
                    {
                        value: '0',
                        label: '未开始',
                    },
                    {
                        value: '1',
                        label: '进行中',
                    },
                    {
                        value: '2',
                        label: '已结束',
                    },
                ],
            },
        }
    },
    {
        itemProps: {
            name: 'createTime',
            label: formatById('view.common.createTime'),
            itemComponent: 'RangePicker'
        }
    },
]