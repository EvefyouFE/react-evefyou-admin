/*
 * @Author: EvefyouFE
 * @Date: 2023-07-31 14:18:50
 * @FilePath: \react-evefyou-admin\build\vite\plugins\mock.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'build/mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    watchFiles: true,
    logger: true,
    // injectFile: "src/main.tsx",
    // injectCode: `
    //   import { setupProdMockServer } from '../mock/_createProductionServer';
    //   console.log('work ............');
    //   setupProdMockServer();
    //   `,
  });
}