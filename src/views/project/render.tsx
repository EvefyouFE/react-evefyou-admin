/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\pages\views\project\render.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { TableActionItem, TableAction, ModalContextData, ModalInstance, Value } from 'react-evefyou-app';
import { Project } from '@common/models/project';
import { Button } from 'antd';
import { formatById } from '@/locales';

export function renderActionFn(modalInstance: Partial<ModalInstance>) {
  const { openModal } = modalInstance;
  function renderAction(value: Value, record: Project, index: number) {
    function handleEditOnClick(v: Value, rd: Project, idx: number) {
      console.debug(v, rd, idx);
      const data: ModalContextData = {
        record: rd,
        isUpdate: true,
      };

      openModal?.(true, data);
    }
    function handleDeleteOnClick(v: Value, rd: Project, idx: number) {
      console.debug(v, rd, idx);
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
        },
      },
    ];
    return <TableAction items={items} />;
  }
  return renderAction;
}

export function renderToolbar() {
  return (
    <Button type="primary">
      {formatById('view.add', { target: formatById('view.project') })}
    </Button>
  );
}
