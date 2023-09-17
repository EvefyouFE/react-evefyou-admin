/*
 * @Author: EvefyouFE
 * @Date: 2023-08-11 22:32:35
 * @FilePath: \react-evefyou-admin\mock\_createProductionServer.ts
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 问题描述
// 1. `import.meta.globEager` 已被弃用, 需要升级vite版本,有兼容问题
// 2. `vite-plugin-mock` 插件问题 https://github.com/vbenjs/vite-plugin-mock/issues/56


const modules: Record<string, any> = import.meta.glob("./**/*.ts", {
  import: "default",
  eager: true,
});

const mockModules = Object.keys(modules).reduce((pre, key) => {
  if (!key.includes("/_")) {
    pre.push(...modules[key]);
  }
  return pre;
}, [] as any[]);

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
