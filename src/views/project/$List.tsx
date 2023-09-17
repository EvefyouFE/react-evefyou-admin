/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\pages\views\project\$List.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { useModalInstance, useTableContainerInstance, BasicTableProps, TableContainer, TableContainerProps } from 'react-evefyou-app';
import { useCallback, useState } from 'react';
import { Project, ProjectReq } from '@models/project';
import { ProjectModal } from './ProjectModal';
import { columns, searchItems } from './list.data';
import { formatById } from '@/locales';
import { renderActionFn, renderToolbar } from './render';
import { queryGetProjectList } from '@/api';

const headerProps: BasicTableProps['headerProps'] = {
  renderToolbar: renderToolbar(),
}

export const ProjectList: React.FC = () => {
  const [modalRef, modalInstance] = useModalInstance();
  const [tableContainerRef, { tableInstance }] = useTableContainerInstance({
    // caption: formatById('view.project.list'),
    title: () => formatById('view.project.list'),
    columns,
    searchProps: {
      items: searchItems,
    },
    actionColumnConfig: {
      width: '10rem',
    }
  })
  const { getPagination } = tableInstance ?? {}
  const { current, pageSize } = getPagination?.() || {}
  const [projectReq] = useState<ProjectReq>({ pageNo: current, pageSize })
  const { data: projectPage } = queryGetProjectList.useQuery({
    params: projectReq,
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderAction = useCallback(renderActionFn(modalInstance), [
    modalInstance,
  ])
  const onChange = useCallback(() => { }, []);
  const onSuccess = useCallback(() => {
    // refetch()
  }, [])
  const propsValue: TableContainerProps<Project> = {
    headerProps,
    onChange,
    dataSource: projectPage?.resultData
  };
  return (
    <div className="project-list">
      <TableContainer<Project> ref={tableContainerRef} {...propsValue}>
        {renderAction}
      </TableContainer>
      <ProjectModal ref={modalRef} onSuccess={onSuccess} />
    </div>
  );
};

export default ProjectList;
