import { MockMethod } from 'vite-plugin-mock';


const dictCodeList = [
  {
    id: 1,
    code: 'NOT_START',
    value: '0',
    desc: '未开始',
  },
  {
    id: 2,
    code: 'GOING',
    value: '1',
    desc: '进行中',
  },
  {
    id: 3,
    code: 'END',
    value: '2',
    desc: '已结束',
  },
];


export default [
  {
    url: '/basic-api/getDictsByCode',
    method: 'get',
    response: ({ body }) => {
      return {
        code: 200,
        data: dictCodeList,
        msg: 'success',
      };
    },
  },
] as MockMethod[];

