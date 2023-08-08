import { MockMethod } from 'vite-plugin-mock';


const mockTodoList = [
  {
    title: '行动代号001之宝塔镇河妖任务',
    description: '任务需要在宇宙大爆炸bombomblablabla嗯嗯嗯嗯嗯嗯嗯嗯结束之前开始',
    state: 1,
    stateDesc: '未开始'
  },
  {
    title: '行动代号001之宝塔镇河妖任务',
    description: '任务需要在宇宙大爆炸bombomblablabla嗯嗯嗯嗯嗯嗯嗯嗯结束之前开始',
    state: 1,
    stateDesc: '未开始'
  },
  {
    title: '行动代号001之宝塔镇河妖任务',
    description: '任务需要在宇宙大爆炸bombomblablabla嗯嗯嗯嗯嗯嗯嗯嗯结束之前开始',
    state: 1,
    stateDesc: '马上到期'
  },
  {
    title: '行动代号001之宝塔镇河妖任务',
    description: '任务需要在宇宙大爆炸bombomblablabla嗯嗯嗯嗯嗯嗯嗯嗯结束之前开始',
    state: 1,
    stateDesc: '已耗时1年'
  },
  {
    title: '行动代号001之宝塔镇河妖任务',
    description: '任务需要在宇宙大爆炸bombomblablabla嗯嗯嗯嗯嗯嗯嗯嗯结束之前开始',
    state: 1,
    stateDesc: '进行中'
  },
  {
    title: '行动代号001之宝塔镇河妖任务',
    description: '任务需要在宇宙大爆炸bombomblablabla嗯嗯嗯嗯嗯嗯嗯嗯结束之前开始',
    state: 1,
    stateDesc: '已结束'
  },
];
const mockNoticeList = [
  {
    icon: 'ant-icon:SmileOutlined',
    title: '你收到了20条消息',
    createTime: '2023-05-22',
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '你收到了21条消息',
    createTime: '2023-05-22',
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '你收到了22条消息',
    createTime: '2023-05-22',
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '你收到了23条消息',
    createTime: '2023-05-22',
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '你收到了24条消息',
    createTime: '2023-05-22',
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '你收到了25条消息',
    createTime: '2023-05-22',
  },
];
const mockMessageList = [
  {
    icon: 'ant-icon:SmileOutlined',
    title: '刘德华 评论了你',
    description: '你真酷！',
    createTime: '2023-05-22'
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '郭富城 评论了你',
    description: '你真酷！',
    createTime: '2023-05-22'
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '周星驰 评论了你',
    description: '你真酷！',
    createTime: '2023-05-22'
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '渣渣辉 评论了你',
    description: '你真酷！',
    createTime: '2023-05-22'
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '刘德华 评论了你',
    description: '你真酷！',
    createTime: '2023-05-22'
  },
  {
    icon: 'ant-icon:SmileOutlined',
    title: '吴彦祖 评论了你',
    description: '你真酷！',
    createTime: '2023-05-22'
  },
];


export default [
  {
    url: '/basic-api/getNoticeList',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 200,
        data: {
          resultData: mockNoticeList,
          totalNum: 6,
          pageNo: 1,
          pageSize: 3,
        },
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/getMessageList',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 200,
        data: {
          resultData: mockMessageList,
          totalNum: 6,
          pageNo: 1,
          pageSize: 3,
        },
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/getTodoList',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 200,
        data: {
          resultData: mockTodoList,
          totalNum: 6,
          pageNo: 1,
          pageSize: 3,
        },
        msg: 'success',
      };
    },
  },
] as MockMethod[];

