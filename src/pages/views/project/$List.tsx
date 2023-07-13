import { ModalContextData, ModalInstance } from "@/components/Modal";
import { BasicTable, BasicTableProps, TableActionItem, TableHeaderProps, BasicTableInstance } from "@/components/Table";
import { TableAction } from "@/components/Table/src/components/TableAction";
import { useCompInstance, useMountEffect, usePage } from "@/hooks";
import { DeleteTwoTone, EditOutlined } from "@ant-design/icons";
import { queryGetProjectList } from "@api/query";
import { Project, ProjectReq } from "@models/index";
import { useQuery } from "@tanstack/react-query";
import { ColumnType } from "antd/es/table";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { ProjectModal } from "./ProjectModal";
import { columns, searchItems } from "./list.data";
import { formatById } from "@/locales";
import { Button, Form } from "antd";
import { renderActionFn, renderToolbar } from "./render";
import { TableContainerInstance } from "@/components/Containers/TableContainer/src/typing";
import { TableContainer, TableContainerProps } from "@/components/Containers";

const headerProps: BasicTableProps['headerProps'] = {
  renderToolbar: renderToolbar(),
}

export const ProjectList: FC = () => {
  const { pageParams } = usePage({ pageNo: 1, pageSize: 10 })
  const [projectReq, setProjectReq] = useState<ProjectReq>(pageParams)
  const { data: projectRes, refetch } = useQuery(queryGetProjectList(projectReq));
  const [modalRef, modalInstance] = useCompInstance<ModalInstance>()
  const {openModal} = modalInstance??{};

  const tableProps: TableContainerProps<Project> = useMemo(() => ({
    // caption: formatById('view.project.list'),
    title: () => formatById('view.project.list'),
    columns,
    dataSource: projectRes?.data.resultData,
    searchConfig: {
      items: searchItems,
    },
    actionColumnConfig: {
      width: '10rem',
    }
  }), [])
  const [tableContainerRef] = useCompInstance<TableContainerInstance>(tableProps)

  const renderAction = useCallback(renderActionFn(modalInstance), [modalInstance])

  const onChange = useCallback(handleTableChange, [])
  const propsValue = {
    headerProps,
    onChange,
  }

  function onSuccess() {
    // refetch()
  }
  function handleTableChange() {

  }
  function handleAddOnClick() {
    const data: ModalContextData = {
      isUpdate: false
    }
    openModal?.(true, data)
  }
  return (
    <div className="project-list">
      <TableContainer<Project> ref={tableContainerRef} {...propsValue} >
        {renderAction}
      </TableContainer>
      <ProjectModal ref={modalRef} onSuccess={onSuccess} />
    </div>
  )
}

export default ProjectList;