
import { ConfigEnv, UserConfig, UserConfigExport, defineConfig } from 'vite';
import { generateModifyVars } from './build/generate/generateModifyVars';
import { loadEnv } from 'vite';
import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/vite/proxy";
import { OUTPUT_DIR } from './build/constant';
import pkg from './package.json';
import moment from 'moment';
import cssnanoPlugin from "cssnano";
import postcssPresetEnv from 'postcss-preset-env';
import { createVitePlugins } from "./build/vite/plugins";
import { getAppConfigSrc } from './build/vite/plugins/html';
import { fileURLToPath } from 'node:url';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  console.log('viteEnv', viteEnv)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    optimizeDeps: {
      include: [
        '@iconify/react',
        '@ant-design/colors',
        '@ant-design/icons',
        'antd/locale/en_US',
        'antd/locale/zh_CN',
      ],
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : [],
    },
    build: {
      target: 'es2021',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      rollupOptions: {
        external: [getAppConfigSrc(viteEnv)], // Add the base path without the timestamp
      },
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
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
        plugins: [
          cssnanoPlugin({
            preset: 'default',
          }) as any,
          postcssPresetEnv({

          })
        ]
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  }
})
