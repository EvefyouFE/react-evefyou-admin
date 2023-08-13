import { MockMethod } from 'vite-plugin-mock';


const mockPermissonList = [
  'dashboard:*',
  'project:list:*',
  'permission:list:*',
  '404:*',
];
const mockMenuTree = [
  {
    path: '/dashboard',
    name: '面板3',
    locale: 'menu.dashboard',
    icon: 'ant-icon:DashboardOutlined',
  },
  {
    path: '/project',
    name: 'Project',
    icon: 'ant-icon:ProjectOutlined',
    locale: 'menu.project',
    children: [
      {
        path: '/project/list',
        name: 'Project List',
        locale: 'menu.project.list',
      }
    ],
  },
  {
    path: '/permission',
    name: 'permission',
    locale: 'menu.permission',
    icon: 'ant-icon:KeyOutlined',
    children: [
      {
        path: '/permission/list',
        name: 'permission list',
        locale: 'menu.permission.list',
        icon: 'ant-icon:FileOutlined',
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    locale: 'menu.404',
    icon: 'ant-icon:SmileOutlined',
  }
];
const mockMenuList = [
  {
    path: '/dashboard',
    name: '面板3',
    locale: 'menu.dashboard',
    icon: 'ant-icon:DashboardOutlined',
    id: 1,
    pId: 0,
  },
  {
    path: '/project',
    name: 'Project',
    icon: 'ant-icon:ProjectOutlined',
    locale: 'menu.project',
    id: 2,
    pId: 0,
  },
  {
    path: '/project/list',
    name: 'Project List',
    locale: 'menu.project.list',
    id: 3,
    pId: 2,
  },
  {
    path: '/permission',
    name: 'permission',
    locale: 'menu.permission',
    icon: 'ant-icon:KeyOutlined',
    id: 4,
    pId: 0,
  },
  {
    path: '/permission/list',
    name: 'permission list',
    locale: 'menu.permission.list',
    icon: 'ant-icon:FileOutlined',
    id: 5,
    pId: 4,
  },
  {
    path: '/404',
    name: '404',
    locale: 'menu.404',
    icon: 'ant-icon:SmileOutlined',
    id: 6,
    pId: 0,
  }
];

const mockPermissionList = [
  'dashboard',
  'project',
  'permission',
  '404'
];


const mockNoticeList = [
  {
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: 'notification'
  },
  {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    type: 'notification'
  },
  {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    read: true,
    type: 'notification'
  },
  {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    type: 'notification'
  },
  {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: 'notification'
  },
  {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true
  },
  {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2017-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: 'event'
  },
  {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: 'event'
  },
  {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2017-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: 'event'
  },
  {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: 'event'
  }
];

export default [
  {
    url: '/basic-api/login',
    method: 'post',
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        data: {
          token: '123abcdefg',
          username: 'evef',
          roles: ['admin'],
        },
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/logout',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        data: null,
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/current/user',
    method: 'get',
    // statusCode: 401,
    response: () => {
      return {
        code: 200,
        data: {
          username: 'evef',
          roles: ['admin'],
          permissions: mockPermissonList,
          avatar: '',
          menuList: mockMenuTree,
          device: 'DESKTOP',
          locale: 'zh-cn',
          newUser: true
        },
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/current/menuTreeList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: mockMenuTree,
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/current/menuList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: mockMenuList,
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/getPermissionList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: mockPermissionList,
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/current/notice',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: mockNoticeList,
        msg: 'success',
      };
    },
  },
] as MockMethod[];

