import { ModalInstance } from "@/components/Modal";
import { BasicTableProps } from "@/components/Table";
import { useCompInstance, usePage } from "@/hooks";
import { queryGetProjectList } from "@api/query";
import { Project, ProjectReq } from "@models/index";
import { useQuery } from "@tanstack/react-query";
import { FC, useCallback, useMemo, useState } from "react";
import { ProjectModal } from "./ProjectModal";
import { columns, searchItems } from "./list.data";
import { formatById } from "@/locales";
import { renderActionFn, renderToolbar } from "./render";
import { TableContainerInstance } from "@/components/Containers/TableContainer/src/typing";
import { TableContainer, TableContainerProps } from "@/components/Containers";

const headerProps: BasicTableProps['headerProps'] = {
  renderToolbar: renderToolbar(),
}

export const ProjectList: FC = () => {
  const { pageParams } = usePage({ pageNo: 1, pageSize: 10 })
  const [projectReq] = useState<ProjectReq>(pageParams)
  const { data: projectRes } = useQuery(queryGetProjectList(projectReq));
  const [modalRef, modalInstance] = useCompInstance<ModalInstance>()

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
  // function handleAddOnClick() {
  //   const data: ModalContextData = {
  //     isUpdate: false
  //   }
  //   openModal?.(true, data)
  // }
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