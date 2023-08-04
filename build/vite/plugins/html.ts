/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import html from 'vite-plugin-htmlx';
import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../../constant';

export const getAppConfigSrc = (env: ViteEnv) => {
  const { VITE_PUBLIC_PATH } = env;
  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;
  return `${path || '/'}${GLOB_CONFIG_FILE_NAME}`;
};

export const getAppConfigSrcUrl = (env: ViteEnv) => {
  return getAppConfigSrc(env).concat(`?v=${pkg.version}-${new Date().getTime()}`);
};

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE } = env;
  return html({
    minify: isBuild,
    page: {
      inject: {
        data: {
          title: VITE_GLOB_APP_TITLE,
          injectScript: isBuild ? `<script src="${getAppConfigSrc(env)}" type="module"></script>`:'',
        }
      },
    }
  });
}
