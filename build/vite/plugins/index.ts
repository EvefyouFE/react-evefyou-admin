import { PluginOption } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import purgeIcons from 'vite-plugin-purge-icons';
import VitePluginCertificate from 'vite-plugin-mkcert';
import { configHtmlPlugin } from './html';
import { configPwaConfig } from './pwa';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
// import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
// import { configThemePlugin } from './theme';
import { configImageminPlugin } from './imagemin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import WindiCSS from 'vite-plugin-windicss';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    react(),
    tsconfigPaths({
      ignoreConfigErrors: true
    }),
    // VitePluginCertificate({
    //   source: 'coding',
    // }),
  ];

  // vite-plugin-windicss
  vitePlugins.push(WindiCSS());

  // @vitejs/plugin-legacy
  // VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  // vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svgr 将svg转为react组件
  vitePlugins.push(svgr());

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  // vitePlugins.push(purgeIcons());

  // vite-plugin-style-import antd5不需要手动引入样式了
//   vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer
  // vitePlugins.push(configVisualizerConfig());

  // vite-plugin-theme antd5 的主题使用token的cssinjs方式，这个插件可能不适用了
//   vitePlugins.push(configThemePlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    // vitePlugins.push(
    //   configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    // );

    // vite-plugin-pwa
    // vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
