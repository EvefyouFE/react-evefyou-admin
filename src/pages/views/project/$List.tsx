
import { Project, ProjectReq } from "@models/project";
import { FC, useCallback, useMemo, useState } from "react";
import { ProjectModal } from "./ProjectModal";
import { ModalInstance } from "@/components/Modal";
import { BasicTableProps } from "@/components/Table";
import { useCompInstance } from "@/hooks/core";
import { usePage } from "@/hooks/components/page";
import { columns, searchItems } from "./list.data";
import { formatById } from "@/locales";
import { renderActionFn, renderToolbar } from "./render";
import { TableContainerInstance } from "@/components/Containers/TableContainer/src/typing";
import { TableContainer, TableContainerProps } from "@/components/Containers";
import { queryGetProjectList } from "@/api";

const headerProps: BasicTableProps['headerProps'] = {
  renderToolbar: renderToolbar(),
}

export const ProjectList: FC = () => {
  const { pageParams } = usePage({ pageNo: 1, pageSize: 10 })
  const [projectReq] = useState<ProjectReq>(pageParams)
  const { data: projectPage } = queryGetProjectList.useQuery({ params: projectReq });
  const [modalRef, modalInstance] = useCompInstance<ModalInstance>()

  const tableProps: TableContainerProps<Project> = useMemo(() => ({
    // caption: formatById('view.project.list'),
    title: () => formatById('view.project.list'),
    columns,
    dataSource: projectPage?.resultData,
    searchConfig: {
      items: searchItems,
    },
    actionColumnConfig: {
      width: '10rem',
    }
  }), [projectPage?.resultData])
  const [tableContainerRef] = useCompInstance<TableContainerInstance>(tableProps)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderAction = useCallback(renderActionFn(modalInstance), [modalInstance])

  const onChange = useCallback(handleTableChange, [])
  const onSuccessCb = useCallback(onSuccess, [])
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
      <ProjectModal ref={modalRef} onSuccess={onSuccessCb} />
    </div>
  )
}

export default ProjectList;