import { defineConfig, resolveBaseUrl } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ViteAliases } from "vite-aliases";
import { generateModifyVars } from './build/generate/generateModifyVars';
import svgr from 'vite-plugin-svgr';
import { viteMockServe } from 'vite-plugin-mock';
import WindiCSS from 'vite-plugin-windicss';
import postcssConfig from './postcss.config';

const pathResolve = (dir: string) => resolve(__dirname, '.', dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteAliases(),
    svgr(),
    viteMockServe({
      mockPath: 'mock',
      watchFiles: true,
      logger: true,
    }),
    WindiCSS()
  ],
  // resolve: {
  //   alias: [
  //     {
  //       find: /^~/,
  //       replacement: pathResolve('node_modules') + '/',
  //     },
  //     {
  //       find: /@\//,
  //       replacement: pathResolve('src') + '/',
  //     }
  //   ]
  // },
  optimizeDeps: {
    include: [
      '@ant-design/colors',
      '@ant-design/icons',
      'antd/locale/en_US',
      'antd/locale/zh_CN',
    ],
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      less: {
        // javascriptEnabled: true
        modifyVars: generateModifyVars()
      }
    },
    postcss: {
      plugins: postcssConfig.plugins
    }
  }
});
