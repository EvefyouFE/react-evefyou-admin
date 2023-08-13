/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:29:42
 * @FilePath: \react-evefyou-admin\mock\dict.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
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
    response: () => {
      return {
        code: 200,
        data: dictCodeList,
        msg: 'success',
      };
    },
  },
  {
    url: '/basic-api/test',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: 'test',
        msg: 'success',
      };
    },
  },
] as MockMethod[];

