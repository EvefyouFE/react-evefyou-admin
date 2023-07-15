import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite';
import { generateModifyVars } from './build/generate/generateModifyVars';
import svgr from 'vite-plugin-svgr';
import { viteMockServe } from 'vite-plugin-mock';
import WindiCSS from 'vite-plugin-windicss';
import postcssConfig from './postcss.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      ignoreConfigErrors: true
    }),
    svgr(),
    viteMockServe({
      mockPath: 'mock',
      watchFiles: true,
      logger: true,
    }),
    WindiCSS()
  ],
  optimizeDeps: {
    include: [
      '@ant-design/colors',
      '@ant-design/icons',
      'antd/locale/en_US',
      'antd/locale/zh_CN',
    ],
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
})
