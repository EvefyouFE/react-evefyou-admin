/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:14:35
 * @FilePath: \react-evefyou-admin\src\main.tsx
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
 */
import { AdminApp, AppImportMetaEnv, PageModule } from "react-evefyou-app";
import ReactDOM from 'react-dom/client';
import 'virtual:windi.css';
import pkg from 'package.json';
import './index.less';
import { locales } from "./locales";
import 'react-evefyou-app/windicss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AdminApp
    version={pkg.version}
    name={pkg.name}
    author={pkg.author.name}
    env={import.meta.env as unknown as AppImportMetaEnv}
    locales={locales}
    pageModules={import.meta.glob<PageModule>('/src/views/**/$*.{ts,tsx}')}
    recoilDebug
    strictMode
  />
);
