// vite.config.ts
import { defineConfig } from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite@4.4.9_@types+node@18.17.4_less@4.2.0_terser@5.19.2/node_modules/vite/dist/node/index.js";

// build/config/themeConfig.ts
import { generate } from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/@ant-design+colors@7.0.0/node_modules/@ant-design/colors/lib/index.js";
var primaryColor = "#0960bd";
function generateAntColors(color, theme = "default") {
  return generate(color, {
    theme
  });
}

// build/generate/generateModifyVars.ts
import { resolve } from "path";
function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];
  const primaryColorObj = {};
  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }
  return {
    hack: `true; @import (reference) "${resolve("src/styles/variables/index.less")}";`,
    "primary-color": primary,
    ...primaryColorObj,
    "text-color": "#c9d1d9",
    "text-color-base": "#000000d9"
    // 'info-color': primary,
    // 'processing-color': primary,
    // 'success-color': '#55D187', //  Success color
    // 'error-color': '#ED6F6F', //  False color
    // 'warning-color': '#EFBD47', //   Warning color
    // //'border-color-base': '#EEEEEE',
    // 'font-size-base': '14px', //  Main font size
    // 'border-radius-base': '2px', //  Component/float fillet
    // 'link-color': primary, //   Link color
    // 'app-content-background': '#fafafa', //   Link color
  };
}

// vite.config.ts
import { loadEnv } from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite@4.4.9_@types+node@18.17.4_less@4.2.0_terser@5.19.2/node_modules/vite/dist/node/index.js";

// build/utils.ts
import dotenv from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/lib/main.js";
function isReportMode() {
  return process.env.REPORT === "true";
}
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/vite/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path2) => path2.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/constant.ts
var GLOB_CONFIG_FILE_NAME = "_app.config.js";
var OUTPUT_DIR = "dist";

// package.json
var package_default = {
  name: "Evefyou Admin",
  private: true,
  version: "0.0.0",
  type: "module",
  author: {
    name: "EvefyouFE",
    email: "eveforest@163.com",
    url: "https://github.com/EvefyouFE"
  },
  scripts: {
    commit: "czg",
    bootstrap: "pnpm install",
    serve: "npm run dev",
    dev: "vite",
    build: "tsc && cross-env NODE_ENV=production vite build && esno ./build/script/postBuild.ts",
    "build:test": "tsc && cross-env vite build --mode test && esno ./build/script/postBuild.ts",
    report: "cross-env REPORT=true npm run build",
    "type:check": "tsc --noEmit --skipLibCheck",
    log: "conventional-changelog -p angular -i CHANGELOG.md -s",
    "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
    "clean:lib": "rimraf node_modules",
    "lint:eslint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:prettier": 'prettier --write  "src/**/*.{js,json,tsx,css,less,scss,html,md}"',
    "lint:lint-staged": "lint-staged",
    "test:unit": "jest",
    "test:gzip": "npx http-server dist --cors --gzip -c-1",
    "test:br": "npx http-server dist --cors --brotli -c-1",
    reinstall: "rimraf pnpm-lock.yaml && rimraf package.lock.json && rimraf node_modules && pnpm run bootstrap",
    preview: "npm run build && vite preview",
    "preview:dist": "vite preview",
    prepare: "husky install"
  },
  dependencies: {
    "@ant-design/colors": "^7.0.0",
    "@ant-design/cssinjs": "^1.9.1",
    "@ant-design/icons": "^5.0.1",
    "@dnd-kit/core": "^6.0.8",
    "@dnd-kit/modifiers": "^6.0.1",
    "@dnd-kit/sortable": "^7.0.2",
    "@dnd-kit/utilities": "^3.2.1",
    "@emotion/css": "^11.11.0",
    "@iconify/react": "^4.1.1",
    "@tanstack/react-query": "^4.28.0",
    ahooks: "^3.7.6",
    antd: "^5.6.3",
    axios: "^1.3.4",
    classnames: "^2.3.2",
    "crypto-js": "^4.1.1",
    history: "^5.3.0",
    moment: "^2.29.4",
    nprogress: "^0.2.0",
    qs: "^6.11.1",
    ramda: "^0.29.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-draggable": "^4.4.5",
    "react-error-boundary": "^4.0.4",
    "react-evefyou-hooks": "^1.0.5",
    "react-intl": "^6.4.4",
    "react-router": "^6.10.0",
    "react-router-dom": "^6.10.0",
    recoil: "^0.7.7",
    "recoil-nexus": "^0.5.0",
    uuid: "^9.0.0"
  },
  devDependencies: {
    "@commitlint/cli": "^17.6.7",
    "@commitlint/config-conventional": "^17.6.7",
    "@types/crypto-js": "^4.1.1",
    "@types/fs-extra": "^11.0.1",
    "@types/mockjs": "^1.0.7",
    "@types/node": "^18.15.11",
    "@types/nprogress": "^0.2.0",
    "@types/qs": "^6.9.7",
    "@types/ramda": "^0.29.1",
    "@types/react": "^18.2.14",
    "@types/react-dom": "^18.2.6",
    "@types/uuid": "^9.0.1",
    "@typescript-eslint/eslint-plugin": "^5.61.0",
    "@typescript-eslint/parser": "^5.61.0",
    "@vitejs/plugin-legacy": "^4.1.1",
    "@vitejs/plugin-react": "^4.0.1",
    "babel-plugin-import": "^1.13.6",
    "conventional-changelog-cli": "^3.0.0",
    "cross-env": "^7.0.3",
    cssnano: "^6.0.1",
    "cz-git": "^1.7.0",
    czg: "^1.7.0",
    dotenv: "^16.3.1",
    eslint: "^8.44.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-airbnb-typescript": "^17.1.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.1",
    esno: "^0.17.0",
    "fs-extra": "^11.1.1",
    gifsicle: "5.2.0",
    husky: "^8.0.3",
    jest: "^29.6.2",
    less: "^4.1.3",
    "lint-staged": "^13.2.3",
    mockjs: "^1.1.0",
    picocolors: "^1.0.0",
    postcss: "^8.4.23",
    "postcss-cli": "^10.1.0",
    "postcss-html": "^1.5.0",
    "postcss-less": "^6.0.0",
    "postcss-preset-env": "^8.3.2",
    prettier: "^3.0.0",
    rimraf: "^5.0.1",
    rollup: "^3.27.1",
    "rollup-plugin-visualizer": "^5.9.2",
    "ts-node": "^10.9.1",
    typescript: "^5.0.2",
    "typescript-plugin-css-modules": "5.0.0",
    vite: "^4.4.0",
    "vite-aliases": "^0.11.0",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-htmlx": "^1.0.3",
    "vite-plugin-imagemin": "^0.6.1",
    "vite-plugin-mkcert": "^1.16.0",
    "vite-plugin-mock": "2.9.8",
    "vite-plugin-purge-icons": "^0.9.2",
    "vite-plugin-pwa": "^0.16.4",
    "vite-plugin-style-import": "^2.0.0",
    "vite-plugin-svgr": "^2.4.0",
    "vite-plugin-windicss": "^1.9.0",
    "vite-tsconfig-paths": "^4.2.0",
    windicss: "^3.5.6"
  },
  resolutions: {
    "bin-wrapper": "npm:bin-wrapper-china"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/EvefyouFE/react-evefyou-admin.git"
  },
  license: "MIT",
  bugs: {
    url: "https://github.com/EvefyouFE/react-evefyou-admin/issues"
  },
  homepage: "https://github.com/EvefyouFE/react-evefyou-admin",
  engines: {
    node: "^16 || >=14"
  },
  "lint-staged": {
    "*.{js,css,ts,tsx,jsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": [
      "prettier --write--parser json"
    ],
    "package.json": [
      "prettier --write"
    ],
    "*.{scss,less,styl,html}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite.config.ts
import moment from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/moment@2.29.4/node_modules/moment/moment.js";
import cssnanoPlugin from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/cssnano@6.0.1_postcss@8.4.27/node_modules/cssnano/src/index.js";
import postcssPresetEnv from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/postcss-preset-env@8.5.1_postcss@8.4.27/node_modules/postcss-preset-env/dist/index.mjs";

// build/vite/plugins/index.ts
import legacy from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/@vitejs+plugin-legacy@4.1.1_terser@5.19.2_vite@4.4.9/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import purgeIcons from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-purge-icons@0.9.2_vite@4.4.9/node_modules/vite-plugin-purge-icons/dist/index.mjs";
import VitePluginCertificate from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-mkcert@1.16.0_vite@4.4.9/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";

// build/vite/plugins/html.ts
import html from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-htmlx@1.0.3_vite@4.4.9/node_modules/vite-plugin-htmlx/dist/index.mjs";
var getAppConfigSrc = (env) => {
  const { VITE_PUBLIC_PATH } = env;
  const path2 = VITE_PUBLIC_PATH.endsWith("/") ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;
  return `${path2 || "/"}${GLOB_CONFIG_FILE_NAME}`;
};
function configHtmlPlugin(env, isBuild) {
  const { VITE_GLOB_APP_TITLE } = env;
  return html({
    minify: isBuild,
    page: {
      inject: {
        data: {
          title: VITE_GLOB_APP_TITLE,
          injectScript: isBuild ? `<script src="${getAppConfigSrc(env)}" type="module"></script>` : ""
        }
      }
    }
  });
}

// build/vite/plugins/pwa.ts
import { VitePWA } from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-pwa@0.16.4_vite@4.4.9_workbox-build@7.0.0_workbox-window@7.0.0/node_modules/vite-plugin-pwa/dist/index.js";
function configPwaConfig(env) {
  const { VITE_USE_PWA, VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME } = env;
  if (VITE_USE_PWA) {
    const pwaPlugin = VitePWA({
      manifest: {
        name: VITE_GLOB_APP_TITLE,
        short_name: VITE_GLOB_APP_SHORT_NAME,
        icons: [
          {
            src: "./resource/img/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./resource/img/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    });
    return pwaPlugin;
  }
  return [];
}

// build/vite/plugins/mock.ts
import { viteMockServe } from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@4.4.9/node_modules/vite-plugin-mock/dist/index.js";
import path from "path";
function configMockPlugin(isBuild) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: "mock",
    localEnabled: isBuild,
    prodEnabled: !isBuild,
    watchFiles: true,
    logger: true,
    injectFile: path.resolve(process.cwd(), "src/main.tsx"),
    injectCode: `
      import { setupProdMockServer } from '../../mock/_createProductionServer';
      console.log('work ............)
      setupProdMockServer();
      `
  });
}

// build/vite/plugins/compress.ts
import compressPlugin from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.4.9/node_modules/vite-plugin-compression/dist/index.mjs";
function configCompressPlugin(compress, deleteOriginFile = false) {
  const compressList = compress.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}

// build/vite/plugins/visualizer.ts
import { visualizer } from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@3.28.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function configVisualizerConfig() {
  if (isReportMode()) {
    console.log("isReportMode()", isReportMode());
    return visualizer({
      filename: "./node_modules/.cache/visualizer/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true
    });
  }
  return [];
}

// build/vite/plugins/imagemin.ts
import viteImagemin from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@4.4.9/node_modules/vite-plugin-imagemin/dist/index.mjs";
function configImageminPlugin() {
  const plugin = viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    mozjpeg: {
      quality: 20
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: "removeViewBox"
        },
        {
          name: "removeEmptyAttrs",
          active: false
        }
      ]
    }
  });
  return plugin;
}

// build/vite/plugins/index.ts
import react from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/@vitejs+plugin-react@4.0.4_vite@4.4.9/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-tsconfig-paths@4.2.0_typescript@5.1.6_vite@4.4.9/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-svgr@2.4.0_rollup@3.28.0_vite@4.4.9/node_modules/vite-plugin-svgr/dist/index.mjs";
import WindiCSS from "file:///C:/projects/frontend/evefyou/react-evefyou-admin/node_modules/.pnpm/vite-plugin-windicss@1.9.0_vite@4.4.9/node_modules/vite-plugin-windicss/dist/index.mjs";
function createVitePlugins(viteEnv, isBuild) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;
  const vitePlugins = [
    react(),
    tsconfigPaths({
      ignoreConfigErrors: true
    }),
    VitePluginCertificate({
      source: "coding"
    })
  ];
  vitePlugins.push(WindiCSS());
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  vitePlugins.push(svgr());
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));
  vitePlugins.push(purgeIcons());
  vitePlugins.push(configVisualizerConfig());
  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
    vitePlugins.push(configPwaConfig(viteEnv));
  }
  return vitePlugins;
}

// vite.config.ts
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  console.log("viteEnv", viteEnv);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === "build";
  return {
    base: VITE_PUBLIC_PATH,
    root,
    optimizeDeps: {
      include: [
        "@iconify/react",
        "@ant-design/colors",
        "@ant-design/icons",
        "antd/locale/en_US",
        "antd/locale/zh_CN"
      ]
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ["console", "debugger"] : []
    },
    build: {
      target: "es2021",
      cssTarget: "chrome80",
      outDir: OUTPUT_DIR,
      rollupOptions: {
        external: [getAppConfigSrc(viteEnv)]
        // Add the base path without the timestamp
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
      chunkSizeWarningLimit: 2e3
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      modules: {
        localsConvention: "camelCase"
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
            preset: "default"
          }),
          postcssPresetEnv({})
        ]
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvY29uZmlnL3RoZW1lQ29uZmlnLnRzIiwgImJ1aWxkL2dlbmVyYXRlL2dlbmVyYXRlTW9kaWZ5VmFycy50cyIsICJidWlsZC91dGlscy50cyIsICJidWlsZC92aXRlL3Byb3h5LnRzIiwgImJ1aWxkL2NvbnN0YW50LnRzIiwgInBhY2thZ2UuanNvbiIsICJidWlsZC92aXRlL3BsdWdpbnMvaW5kZXgudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL2h0bWwudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL3B3YS50cyIsICJidWlsZC92aXRlL3BsdWdpbnMvbW9jay50cyIsICJidWlsZC92aXRlL3BsdWdpbnMvY29tcHJlc3MudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL3Zpc3VhbGl6ZXIudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW5zL2ltYWdlbWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxccHJvamVjdHNcXFxcZnJvbnRlbmRcXFxcZXZlZnlvdVxcXFxyZWFjdC1ldmVmeW91LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxmcm9udGVuZFxcXFxldmVmeW91XFxcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3RzL2Zyb250ZW5kL2V2ZWZ5b3UvcmVhY3QtZXZlZnlvdS1hZG1pbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IENvbmZpZ0VudiwgVXNlckNvbmZpZywgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBnZW5lcmF0ZU1vZGlmeVZhcnMgfSBmcm9tICcuL2J1aWxkL2dlbmVyYXRlL2dlbmVyYXRlTW9kaWZ5VmFycyc7XG5pbXBvcnQgeyBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyB3cmFwcGVyRW52IH0gZnJvbSBcIi4vYnVpbGQvdXRpbHNcIjtcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSBcIi4vYnVpbGQvdml0ZS9wcm94eVwiO1xuaW1wb3J0IHsgT1VUUFVUX0RJUiB9IGZyb20gJy4vYnVpbGQvY29uc3RhbnQnO1xuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgY3NzbmFub1BsdWdpbiBmcm9tIFwiY3NzbmFub1wiO1xuaW1wb3J0IHBvc3Rjc3NQcmVzZXRFbnYgZnJvbSAncG9zdGNzcy1wcmVzZXQtZW52JztcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSBcIi4vYnVpbGQvdml0ZS9wbHVnaW5zXCI7XG5pbXBvcnQgeyBnZXRBcHBDb25maWdTcmMgfSBmcm9tICcuL2J1aWxkL3ZpdGUvcGx1Z2lucy9odG1sJztcblxuY29uc3QgeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9ID0gcGtnO1xuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICBwa2c6IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSxcbiAgbGFzdEJ1aWxkVGltZTogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KTtcblxuICAvLyBUaGUgYm9vbGVhbiB0eXBlIHJlYWQgYnkgbG9hZEVudiBpcyBhIHN0cmluZy4gVGhpcyBmdW5jdGlvbiBjYW4gYmUgY29udmVydGVkIHRvIGJvb2xlYW4gdHlwZVxuICBjb25zdCB2aXRlRW52ID0gd3JhcHBlckVudihlbnYpO1xuICBjb25zb2xlLmxvZygndml0ZUVudicsIHZpdGVFbnYpXG5cbiAgY29uc3QgeyBWSVRFX1BPUlQsIFZJVEVfUFVCTElDX1BBVEgsIFZJVEVfUFJPWFksIFZJVEVfRFJPUF9DT05TT0xFIH0gPSB2aXRlRW52O1xuXG4gIGNvbnN0IGlzQnVpbGQgPSBjb21tYW5kID09PSAnYnVpbGQnO1xuXG4gIHJldHVybiB7XG4gICAgYmFzZTogVklURV9QVUJMSUNfUEFUSCxcbiAgICByb290LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAnQGljb25pZnkvcmVhY3QnLFxuICAgICAgICAnQGFudC1kZXNpZ24vY29sb3JzJyxcbiAgICAgICAgJ0BhbnQtZGVzaWduL2ljb25zJyxcbiAgICAgICAgJ2FudGQvbG9jYWxlL2VuX1VTJyxcbiAgICAgICAgJ2FudGQvbG9jYWxlL3poX0NOJyxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGh0dHBzOiBmYWxzZSxcbiAgICAgIC8vIExpc3RlbmluZyBvbiBhbGwgbG9jYWwgSVBzXG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgcG9ydDogVklURV9QT1JULFxuICAgICAgLy8gTG9hZCBwcm94eSBjb25maWd1cmF0aW9uIGZyb20gLmVudlxuICAgICAgcHJveHk6IGNyZWF0ZVByb3h5KFZJVEVfUFJPWFkpLFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgZHJvcDogVklURV9EUk9QX0NPTlNPTEUgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogJ2VzMjAyMScsXG4gICAgICBjc3NUYXJnZXQ6ICdjaHJvbWU4MCcsXG4gICAgICBvdXREaXI6IE9VVFBVVF9ESVIsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsOiBbZ2V0QXBwQ29uZmlnU3JjKHZpdGVFbnYpXSwgLy8gQWRkIHRoZSBiYXNlIHBhdGggd2l0aG91dCB0aGUgdGltZXN0YW1wXG4gICAgICB9LFxuICAgICAgLy8gbWluaWZ5OiAndGVyc2VyJyxcbiAgICAgIC8qKlxuICAgICAgICogXHU1RjUzIG1pbmlmeT1cdTIwMUNtaW5pZnk6J3RlcnNlcidcdTIwMUQgXHU4OUUzXHU1RjAwXHU2Q0U4XHU5MUNBXG4gICAgICAgKiBVbmNvbW1lbnQgd2hlbiBtaW5pZnk9XCJtaW5pZnk6J3RlcnNlcidcIlxuICAgICAgICovXG4gICAgICAvLyB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAvLyAgIGNvbXByZXNzOiB7XG4gICAgICAvLyAgICAga2VlcF9pbmZpbml0eTogdHJ1ZSxcbiAgICAgIC8vICAgICBkcm9wX2NvbnNvbGU6IFZJVEVfRFJPUF9DT05TT0xFLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICAgIC8vIFR1cm5pbmcgb2ZmIGJyb3RsaVNpemUgZGlzcGxheSBjYW4gc2xpZ2h0bHkgcmVkdWNlIHBhY2thZ2luZyB0aW1lXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fQVBQX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoX19BUFBfSU5GT19fKSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgbW9kdWxlczoge1xuICAgICAgICBsb2NhbHNDb252ZW50aW9uOiAnY2FtZWxDYXNlJ1xuICAgICAgfSxcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIC8vIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXG4gICAgICAgICAgbW9kaWZ5VmFyczogZ2VuZXJhdGVNb2RpZnlWYXJzKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIGNzc25hbm9QbHVnaW4oe1xuICAgICAgICAgICAgcHJlc2V0OiAnZGVmYXVsdCcsXG4gICAgICAgICAgfSkgYXMgYW55LFxuICAgICAgICAgIHBvc3Rjc3NQcmVzZXRFbnYoe1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0sXG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudiwgaXNCdWlsZCksXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFxjb25maWdcXFxcdGhlbWVDb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3RzL2Zyb250ZW5kL2V2ZWZ5b3UvcmVhY3QtZXZlZnlvdS1hZG1pbi9idWlsZC9jb25maWcvdGhlbWVDb25maWcudHNcIjtpbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gJ0BhbnQtZGVzaWduL2NvbG9ycyc7XG5cbmV4cG9ydCBjb25zdCBwcmltYXJ5Q29sb3IgPSAnIzA5NjBiZCc7XG5cbmV4cG9ydCBjb25zdCBkYXJrTW9kZSA9ICdsaWdodCc7XG5cbnR5cGUgRm4gPSAoLi4uYXJnOiBhbnkpID0+IGFueTtcblxudHlwZSBHZW5lcmF0ZVRoZW1lID0gJ2RlZmF1bHQnIHwgJ2RhcmsnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlQ29sb3JzUGFyYW1zIHtcbiAgbWl4TGlnaHRlbjogRm47XG4gIG1peERhcmtlbjogRm47XG4gIHRpbnljb2xvcjogYW55O1xuICBjb2xvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQW50Q29sb3JzKGNvbG9yOiBzdHJpbmcsIHRoZW1lOiBHZW5lcmF0ZVRoZW1lID0gJ2RlZmF1bHQnKSB7XG4gIHJldHVybiBnZW5lcmF0ZShjb2xvciwge1xuICAgIHRoZW1lLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRoZW1lQ29sb3JzKGNvbG9yPzogc3RyaW5nKSB7XG4gIGNvbnN0IHRjID0gY29sb3IgfHwgcHJpbWFyeUNvbG9yO1xuICBjb25zdCBsaWdodENvbG9ycyA9IGdlbmVyYXRlQW50Q29sb3JzKHRjKTtcbiAgY29uc3QgcHJpbWFyeSA9IGxpZ2h0Q29sb3JzWzVdO1xuICBjb25zdCBtb2RlQ29sb3JzID0gZ2VuZXJhdGVBbnRDb2xvcnMocHJpbWFyeSwgJ2RhcmsnKTtcblxuICByZXR1cm4gWy4uLmxpZ2h0Q29sb3JzLCAuLi5tb2RlQ29sb3JzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlQ29sb3JzKHtcbiAgY29sb3IgPSBwcmltYXJ5Q29sb3IsXG4gIG1peExpZ2h0ZW4sXG4gIG1peERhcmtlbixcbiAgdGlueWNvbG9yLFxufTogR2VuZXJhdGVDb2xvcnNQYXJhbXMpIHtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KDE5KS5maWxsKDApO1xuICBjb25zdCBsaWdodGVucyA9IGFyci5tYXAoKF90LCBpKSA9PiB7XG4gICAgcmV0dXJuIG1peExpZ2h0ZW4oY29sb3IsIGkgLyA1KTtcbiAgfSk7XG5cbiAgY29uc3QgZGFya2VucyA9IGFyci5tYXAoKF90LCBpKSA9PiB7XG4gICAgcmV0dXJuIG1peERhcmtlbihjb2xvciwgaSAvIDUpO1xuICB9KTtcblxuICBjb25zdCBhbHBoYUNvbG9ycyA9IGFyci5tYXAoKF90LCBpKSA9PiB7XG4gICAgcmV0dXJuIHRpbnljb2xvcihjb2xvcilcbiAgICAgIC5zZXRBbHBoYShpIC8gMjApXG4gICAgICAudG9SZ2JTdHJpbmcoKTtcbiAgfSk7XG5cbiAgY29uc3Qgc2hvcnRBbHBoYUNvbG9ycyA9IGFscGhhQ29sb3JzLm1hcCgoaXRlbSkgPT4gaXRlbS5yZXBsYWNlKC9cXHMvZywgJycpLnJlcGxhY2UoLzBcXC4vZywgJy4nKSk7XG5cbiAgY29uc3QgdGlueWNvbG9yTGlnaHRlbnMgPSBhcnJcbiAgICAubWFwKChfdCwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHRpbnljb2xvcihjb2xvcilcbiAgICAgICAgLmxpZ2h0ZW4oaSAqIDUpXG4gICAgICAgIC50b0hleFN0cmluZygpO1xuICAgIH0pXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gJyNmZmZmZmYnKTtcblxuICBjb25zdCB0aW55Y29sb3JEYXJrZW5zID0gYXJyXG4gICAgLm1hcCgoX3QsIGkpID0+IHtcbiAgICAgIHJldHVybiB0aW55Y29sb3IoY29sb3IpXG4gICAgICAgIC5kYXJrZW4oaSAqIDUpXG4gICAgICAgIC50b0hleFN0cmluZygpO1xuICAgIH0pXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gJyMwMDAwMDAnKTtcbiAgcmV0dXJuIFtcbiAgICAuLi5saWdodGVucyxcbiAgICAuLi5kYXJrZW5zLFxuICAgIC4uLmFscGhhQ29sb3JzLFxuICAgIC4uLnNob3J0QWxwaGFDb2xvcnMsXG4gICAgLi4udGlueWNvbG9yRGFya2VucyxcbiAgICAuLi50aW55Y29sb3JMaWdodGVucyxcbiAgXS5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmluY2x1ZGVzKCctJykpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxmcm9udGVuZFxcXFxldmVmeW91XFxcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXFxcYnVpbGRcXFxcZ2VuZXJhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFxnZW5lcmF0ZVxcXFxnZW5lcmF0ZU1vZGlmeVZhcnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3RzL2Zyb250ZW5kL2V2ZWZ5b3UvcmVhY3QtZXZlZnlvdS1hZG1pbi9idWlsZC9nZW5lcmF0ZS9nZW5lcmF0ZU1vZGlmeVZhcnMudHNcIjtpbXBvcnQgeyBnZW5lcmF0ZUFudENvbG9ycywgcHJpbWFyeUNvbG9yIH0gZnJvbSAnLi4vY29uZmlnL3RoZW1lQ29uZmlnJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBsZXNzIGdsb2JhbCB2YXJpYWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNb2RpZnlWYXJzKGRhcmsgPSBmYWxzZSkge1xuICBjb25zdCBwYWxldHRlcyA9IGdlbmVyYXRlQW50Q29sb3JzKHByaW1hcnlDb2xvcik7XG4gIGNvbnN0IHByaW1hcnkgPSBwYWxldHRlc1s1XTtcblxuICBjb25zdCBwcmltYXJ5Q29sb3JPYmo6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMTA7IGluZGV4KyspIHtcbiAgICBwcmltYXJ5Q29sb3JPYmpbYHByaW1hcnktJHtpbmRleCArIDF9YF0gPSBwYWxldHRlc1tpbmRleF07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhY2s6IGB0cnVlOyBAaW1wb3J0IChyZWZlcmVuY2UpIFwiJHtyZXNvbHZlKCdzcmMvc3R5bGVzL3ZhcmlhYmxlcy9pbmRleC5sZXNzJyl9XCI7YCxcbiAgICAncHJpbWFyeS1jb2xvcic6IHByaW1hcnksXG4gICAgLi4ucHJpbWFyeUNvbG9yT2JqLFxuICAgICd0ZXh0LWNvbG9yJzogJyNjOWQxZDknLFxuICAgICd0ZXh0LWNvbG9yLWJhc2UnOiAnIzAwMDAwMGQ5JyxcbiAgICAvLyAnaW5mby1jb2xvcic6IHByaW1hcnksXG4gICAgLy8gJ3Byb2Nlc3NpbmctY29sb3InOiBwcmltYXJ5LFxuICAgIC8vICdzdWNjZXNzLWNvbG9yJzogJyM1NUQxODcnLCAvLyAgU3VjY2VzcyBjb2xvclxuICAgIC8vICdlcnJvci1jb2xvcic6ICcjRUQ2RjZGJywgLy8gIEZhbHNlIGNvbG9yXG4gICAgLy8gJ3dhcm5pbmctY29sb3InOiAnI0VGQkQ0NycsIC8vICAgV2FybmluZyBjb2xvclxuICAgIC8vIC8vJ2JvcmRlci1jb2xvci1iYXNlJzogJyNFRUVFRUUnLFxuICAgIC8vICdmb250LXNpemUtYmFzZSc6ICcxNHB4JywgLy8gIE1haW4gZm9udCBzaXplXG4gICAgLy8gJ2JvcmRlci1yYWRpdXMtYmFzZSc6ICcycHgnLCAvLyAgQ29tcG9uZW50L2Zsb2F0IGZpbGxldFxuICAgIC8vICdsaW5rLWNvbG9yJzogcHJpbWFyeSwgLy8gICBMaW5rIGNvbG9yXG4gICAgLy8gJ2FwcC1jb250ZW50LWJhY2tncm91bmQnOiAnI2ZhZmFmYScsIC8vICAgTGluayBjb2xvclxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxmcm9udGVuZFxcXFxldmVmeW91XFxcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamVjdHMvZnJvbnRlbmQvZXZlZnlvdS9yZWFjdC1ldmVmeW91LWFkbWluL2J1aWxkL3V0aWxzLnRzXCI7aW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdwcm9kdWN0aW9uJztcbn1cblxuLyoqXG4gKiBXaGV0aGVyIHRvIGdlbmVyYXRlIHBhY2thZ2UgcHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSZXBvcnRNb2RlKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gcHJvY2Vzcy5lbnYuUkVQT1JUID09PSAndHJ1ZSc7XG59XG5cbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBJbXBvcnRNZXRhRW52IHtcbiAgY29uc3QgcmV0OiBhbnkgPSB7fTtcblxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcbiAgICBsZXQgcmVhbE5hbWUgPSBlbnZDb25mW2Vudk5hbWVdLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKTtcbiAgICByZWFsTmFtZSA9IHJlYWxOYW1lID09PSAndHJ1ZScgPyB0cnVlIDogcmVhbE5hbWUgPT09ICdmYWxzZScgPyBmYWxzZSA6IHJlYWxOYW1lO1xuXG4gICAgaWYgKGVudk5hbWUgPT09ICdWSVRFX1BPUlQnKSB7XG4gICAgICByZWFsTmFtZSA9IE51bWJlcihyZWFsTmFtZSk7XG4gICAgfVxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QUk9YWScgJiYgcmVhbE5hbWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZS5yZXBsYWNlKC8nL2csICdcIicpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlYWxOYW1lID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lO1xuICAgIC8vIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gICBwcm9jZXNzLmVudltlbnZOYW1lXSA9IHJlYWxOYW1lO1xuICAgIC8vIH0gZWxzZSBpZiAodHlwZW9mIHJlYWxOYW1lID09PSAnb2JqZWN0Jykge1xuICAgIC8vICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSBKU09OLnN0cmluZ2lmeShyZWFsTmFtZSk7XG4gICAgLy8gfVxuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogXHU4M0I3XHU1M0Q2XHU1RjUzXHU1MjREXHU3M0FGXHU1ODgzXHU0RTBCXHU3NTFGXHU2NTQ4XHU3Njg0XHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU1NDBEXG4gKi9cbmZ1bmN0aW9uIGdldENvbmZGaWxlcygpIHtcbiAgY29uc3Qgc2NyaXB0ID0gcHJvY2Vzcy5lbnYubnBtX2xpZmVjeWNsZV9zY3JpcHQ7XG4gIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoJy0tbW9kZSAoW2Etel9cXFxcZF0rKScpO1xuICBjb25zdCByZXN1bHQgPSByZWcuZXhlYyhzY3JpcHQgYXMgc3RyaW5nKSBhcyBhbnk7XG4gIGlmIChyZXN1bHQpIHtcbiAgICBjb25zdCBtb2RlID0gcmVzdWx0WzFdIGFzIHN0cmluZztcbiAgICByZXR1cm4gWycuZW52JywgYC5lbnYuJHttb2RlfWBdO1xuICB9XG4gIHJldHVybiBbJy5lbnYnLCAnLmVudi5wcm9kdWN0aW9uJ107XG59XG5cbi8qKlxuICogR2V0IHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgc3RhcnRpbmcgd2l0aCB0aGUgc3BlY2lmaWVkIHByZWZpeFxuICogQHBhcmFtIG1hdGNoIHByZWZpeFxuICogQHBhcmFtIGNvbmZGaWxlcyBleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVudkNvbmZpZyhtYXRjaCA9ICdWSVRFX0dMT0JfJywgY29uZkZpbGVzID0gZ2V0Q29uZkZpbGVzKCkpIHtcbiAgbGV0IGVudkNvbmZpZyA9IHt9O1xuICBjb25mRmlsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBlbnYgPSBkb3RlbnYucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBpdGVtKSkpO1xuICAgICAgZW52Q29uZmlnID0geyAuLi5lbnZDb25maWcsIC4uLmVudiB9O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIHBhcnNpbmcgJHtpdGVtfWAsIGUpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYF4oJHttYXRjaH0pYCk7XG4gIE9iamVjdC5rZXlzKGVudkNvbmZpZykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKCFyZWcudGVzdChrZXkpKSB7XG4gICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGVudkNvbmZpZywga2V5KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZW52Q29uZmlnO1xufVxuXG4vKipcbiAqIEdldCB1c2VyIHJvb3QgZGlyZWN0b3J5XG4gKiBAcGFyYW0gZGlyIGZpbGUgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFBhdGgoLi4uZGlyOiBzdHJpbmdbXSkge1xuICByZXR1cm4gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIC4uLmRpcik7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxmcm9udGVuZFxcXFxldmVmeW91XFxcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXFxcYnVpbGRcXFxcdml0ZVxcXFxwcm94eS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamVjdHMvZnJvbnRlbmQvZXZlZnlvdS9yZWFjdC1ldmVmeW91LWFkbWluL2J1aWxkL3ZpdGUvcHJveHkudHNcIjsvKipcbiAqIFVzZWQgdG8gcGFyc2UgdGhlIC5lbnYuZGV2ZWxvcG1lbnQgcHJveHkgY29uZmlndXJhdGlvblxuICovXG5pbXBvcnQgdHlwZSB7IFByb3h5T3B0aW9ucyB9IGZyb20gJ3ZpdGUnO1xuXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ107XG5cbnR5cGUgUHJveHlMaXN0ID0gUHJveHlJdGVtW107XG5cbnR5cGUgUHJveHlUYXJnZXRMaXN0ID0gUmVjb3JkPHN0cmluZywgUHJveHlPcHRpb25zPjtcblxuY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvLztcblxuLyoqXG4gKiBHZW5lcmF0ZSBwcm94eVxuICogQHBhcmFtIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XG4gIGNvbnN0IHJldDogUHJveHlUYXJnZXRMaXN0ID0ge307XG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XG4gICAgY29uc3QgaXNIdHRwcyA9IGh0dHBzUkUudGVzdCh0YXJnZXQpO1xuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h0dHAtcGFydHkvbm9kZS1odHRwLXByb3h5I29wdGlvbnNcbiAgICByZXRbcHJlZml4XSA9IHtcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgd3M6IHRydWUsXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxuICAgICAgLy8gaHR0cHMgaXMgcmVxdWlyZSBzZWN1cmU9ZmFsc2VcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSksXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxmcm9udGVuZFxcXFxldmVmeW91XFxcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFxjb25zdGFudC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamVjdHMvZnJvbnRlbmQvZXZlZnlvdS9yZWFjdC1ldmVmeW91LWFkbWluL2J1aWxkL2NvbnN0YW50LnRzXCI7LyoqXG4gKiBUaGUgbmFtZSBvZiB0aGUgY29uZmlndXJhdGlvbiBmaWxlIGVudGVyZWQgaW4gdGhlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IEdMT0JfQ09ORklHX0ZJTEVfTkFNRSA9ICdfYXBwLmNvbmZpZy5qcyc7XG5cbmV4cG9ydCBjb25zdCBPVVRQVVRfRElSID0gJ2Rpc3QnO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwiRXZlZnlvdSBBZG1pblwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjBcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJFdmVmeW91RkVcIixcbiAgICBcImVtYWlsXCI6IFwiZXZlZm9yZXN0QDE2My5jb21cIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9FdmVmeW91RkVcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiY29tbWl0XCI6IFwiY3pnXCIsXG4gICAgXCJib290c3RyYXBcIjogXCJwbnBtIGluc3RhbGxcIixcbiAgICBcInNlcnZlXCI6IFwibnBtIHJ1biBkZXZcIixcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIGNyb3NzLWVudiBOT0RFX0VOVj1wcm9kdWN0aW9uIHZpdGUgYnVpbGQgJiYgZXNubyAuL2J1aWxkL3NjcmlwdC9wb3N0QnVpbGQudHNcIixcbiAgICBcImJ1aWxkOnRlc3RcIjogXCJ0c2MgJiYgY3Jvc3MtZW52IHZpdGUgYnVpbGQgLS1tb2RlIHRlc3QgJiYgZXNubyAuL2J1aWxkL3NjcmlwdC9wb3N0QnVpbGQudHNcIixcbiAgICBcInJlcG9ydFwiOiBcImNyb3NzLWVudiBSRVBPUlQ9dHJ1ZSBucG0gcnVuIGJ1aWxkXCIsXG4gICAgXCJ0eXBlOmNoZWNrXCI6IFwidHNjIC0tbm9FbWl0IC0tc2tpcExpYkNoZWNrXCIsXG4gICAgXCJsb2dcIjogXCJjb252ZW50aW9uYWwtY2hhbmdlbG9nIC1wIGFuZ3VsYXIgLWkgQ0hBTkdFTE9HLm1kIC1zXCIsXG4gICAgXCJjbGVhbjpjYWNoZVwiOiBcInJpbXJhZiBub2RlX21vZHVsZXMvLmNhY2hlLyAmJiByaW1yYWYgbm9kZV9tb2R1bGVzLy52aXRlXCIsXG4gICAgXCJjbGVhbjpsaWJcIjogXCJyaW1yYWYgbm9kZV9tb2R1bGVzXCIsXG4gICAgXCJsaW50OmVzbGludFwiOiBcImVzbGludCBzcmMgLS1leHQgdHMsdHN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMFwiLFxuICAgIFwibGludDpwcmV0dGllclwiOiBcInByZXR0aWVyIC0td3JpdGUgIFxcXCJzcmMvKiovKi57anMsanNvbix0c3gsY3NzLGxlc3Msc2NzcyxodG1sLG1kfVxcXCJcIixcbiAgICBcImxpbnQ6bGludC1zdGFnZWRcIjogXCJsaW50LXN0YWdlZFwiLFxuICAgIFwidGVzdDp1bml0XCI6IFwiamVzdFwiLFxuICAgIFwidGVzdDpnemlwXCI6IFwibnB4IGh0dHAtc2VydmVyIGRpc3QgLS1jb3JzIC0tZ3ppcCAtYy0xXCIsXG4gICAgXCJ0ZXN0OmJyXCI6IFwibnB4IGh0dHAtc2VydmVyIGRpc3QgLS1jb3JzIC0tYnJvdGxpIC1jLTFcIixcbiAgICBcInJlaW5zdGFsbFwiOiBcInJpbXJhZiBwbnBtLWxvY2sueWFtbCAmJiByaW1yYWYgcGFja2FnZS5sb2NrLmpzb24gJiYgcmltcmFmIG5vZGVfbW9kdWxlcyAmJiBwbnBtIHJ1biBib290c3RyYXBcIixcbiAgICBcInByZXZpZXdcIjogXCJucG0gcnVuIGJ1aWxkICYmIHZpdGUgcHJldmlld1wiLFxuICAgIFwicHJldmlldzpkaXN0XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJwcmVwYXJlXCI6IFwiaHVza3kgaW5zdGFsbFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnQtZGVzaWduL2NvbG9yc1wiOiBcIl43LjAuMFwiLFxuICAgIFwiQGFudC1kZXNpZ24vY3NzaW5qc1wiOiBcIl4xLjkuMVwiLFxuICAgIFwiQGFudC1kZXNpZ24vaWNvbnNcIjogXCJeNS4wLjFcIixcbiAgICBcIkBkbmQta2l0L2NvcmVcIjogXCJeNi4wLjhcIixcbiAgICBcIkBkbmQta2l0L21vZGlmaWVyc1wiOiBcIl42LjAuMVwiLFxuICAgIFwiQGRuZC1raXQvc29ydGFibGVcIjogXCJeNy4wLjJcIixcbiAgICBcIkBkbmQta2l0L3V0aWxpdGllc1wiOiBcIl4zLjIuMVwiLFxuICAgIFwiQGVtb3Rpb24vY3NzXCI6IFwiXjExLjExLjBcIixcbiAgICBcIkBpY29uaWZ5L3JlYWN0XCI6IFwiXjQuMS4xXCIsXG4gICAgXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjogXCJeNC4yOC4wXCIsXG4gICAgXCJhaG9va3NcIjogXCJeMy43LjZcIixcbiAgICBcImFudGRcIjogXCJeNS42LjNcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuMy40XCIsXG4gICAgXCJjbGFzc25hbWVzXCI6IFwiXjIuMy4yXCIsXG4gICAgXCJjcnlwdG8tanNcIjogXCJeNC4xLjFcIixcbiAgICBcImhpc3RvcnlcIjogXCJeNS4zLjBcIixcbiAgICBcIm1vbWVudFwiOiBcIl4yLjI5LjRcIixcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxuICAgIFwicXNcIjogXCJeNi4xMS4xXCIsXG4gICAgXCJyYW1kYVwiOiBcIl4wLjI5LjBcIixcbiAgICBcInJlYWN0XCI6IFwiXjE4LjIuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxuICAgIFwicmVhY3QtZHJhZ2dhYmxlXCI6IFwiXjQuNC41XCIsXG4gICAgXCJyZWFjdC1lcnJvci1ib3VuZGFyeVwiOiBcIl40LjAuNFwiLFxuICAgIFwicmVhY3QtZXZlZnlvdS1ob29rc1wiOiBcIl4xLjAuNVwiLFxuICAgIFwicmVhY3QtaW50bFwiOiBcIl42LjQuNFwiLFxuICAgIFwicmVhY3Qtcm91dGVyXCI6IFwiXjYuMTAuMFwiLFxuICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBcIl42LjEwLjBcIixcbiAgICBcInJlY29pbFwiOiBcIl4wLjcuN1wiLFxuICAgIFwicmVjb2lsLW5leHVzXCI6IFwiXjAuNS4wXCIsXG4gICAgXCJ1dWlkXCI6IFwiXjkuMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNvbW1pdGxpbnQvY2xpXCI6IFwiXjE3LjYuN1wiLFxuICAgIFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xNy42LjdcIixcbiAgICBcIkB0eXBlcy9jcnlwdG8tanNcIjogXCJeNC4xLjFcIixcbiAgICBcIkB0eXBlcy9mcy1leHRyYVwiOiBcIl4xMS4wLjFcIixcbiAgICBcIkB0eXBlcy9tb2NranNcIjogXCJeMS4wLjdcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjE1LjExXCIsXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJAdHlwZXMvcXNcIjogXCJeNi45LjdcIixcbiAgICBcIkB0eXBlcy9yYW1kYVwiOiBcIl4wLjI5LjFcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjE0XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuNlwiLFxuICAgIFwiQHR5cGVzL3V1aWRcIjogXCJeOS4wLjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjUuNjEuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl41LjYxLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLWxlZ2FjeVwiOiBcIl40LjEuMVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4wLjFcIixcbiAgICBcImJhYmVsLXBsdWdpbi1pbXBvcnRcIjogXCJeMS4xMy42XCIsXG4gICAgXCJjb252ZW50aW9uYWwtY2hhbmdlbG9nLWNsaVwiOiBcIl4zLjAuMFwiLFxuICAgIFwiY3Jvc3MtZW52XCI6IFwiXjcuMC4zXCIsXG4gICAgXCJjc3NuYW5vXCI6IFwiXjYuMC4xXCIsXG4gICAgXCJjei1naXRcIjogXCJeMS43LjBcIixcbiAgICBcImN6Z1wiOiBcIl4xLjcuMFwiLFxuICAgIFwiZG90ZW52XCI6IFwiXjE2LjMuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNDQuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1haXJibmJcIjogXCJeMTkuMC40XCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLWFpcmJuYi10eXBlc2NyaXB0XCI6IFwiXjE3LjEuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjguMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yNy41XCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuNy4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjUuMC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzIuMlwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuNC4xXCIsXG4gICAgXCJlc25vXCI6IFwiXjAuMTcuMFwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMS4xXCIsXG4gICAgXCJnaWZzaWNsZVwiOiBcIjUuMi4wXCIsXG4gICAgXCJodXNreVwiOiBcIl44LjAuM1wiLFxuICAgIFwiamVzdFwiOiBcIl4yOS42LjJcIixcbiAgICBcImxlc3NcIjogXCJeNC4xLjNcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjEzLjIuM1wiLFxuICAgIFwibW9ja2pzXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJwaWNvY29sb3JzXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4yM1wiLFxuICAgIFwicG9zdGNzcy1jbGlcIjogXCJeMTAuMS4wXCIsXG4gICAgXCJwb3N0Y3NzLWh0bWxcIjogXCJeMS41LjBcIixcbiAgICBcInBvc3Rjc3MtbGVzc1wiOiBcIl42LjAuMFwiLFxuICAgIFwicG9zdGNzcy1wcmVzZXQtZW52XCI6IFwiXjguMy4yXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjAuMFwiLFxuICAgIFwicmltcmFmXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJyb2xsdXBcIjogXCJeMy4yNy4xXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS45LjJcIixcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMC4yXCIsXG4gICAgXCJ0eXBlc2NyaXB0LXBsdWdpbi1jc3MtbW9kdWxlc1wiOiBcIjUuMC4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC4wXCIsXG4gICAgXCJ2aXRlLWFsaWFzZXNcIjogXCJeMC4xMS4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbHhcIjogXCJeMS4wLjNcIixcbiAgICBcInZpdGUtcGx1Z2luLWltYWdlbWluXCI6IFwiXjAuNi4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1ta2NlcnRcIjogXCJeMS4xNi4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1tb2NrXCI6IFwiMi45LjhcIixcbiAgICBcInZpdGUtcGx1Z2luLXB1cmdlLWljb25zXCI6IFwiXjAuOS4yXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1wd2FcIjogXCJeMC4xNi40XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnRcIjogXCJeMi4wLjBcIixcbiAgICBcInZpdGUtcGx1Z2luLXN2Z3JcIjogXCJeMi40LjBcIixcbiAgICBcInZpdGUtcGx1Z2luLXdpbmRpY3NzXCI6IFwiXjEuOS4wXCIsXG4gICAgXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMi4wXCIsXG4gICAgXCJ3aW5kaWNzc1wiOiBcIl4zLjUuNlwiXG4gIH0sXG4gIFwicmVzb2x1dGlvbnNcIjoge1xuICAgIFwiYmluLXdyYXBwZXJcIjogXCJucG06YmluLXdyYXBwZXItY2hpbmFcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9FdmVmeW91RkUvcmVhY3QtZXZlZnlvdS1hZG1pbi5naXRcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9FdmVmeW91RkUvcmVhY3QtZXZlZnlvdS1hZG1pbi9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0V2ZWZ5b3VGRS9yZWFjdC1ldmVmeW91LWFkbWluXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiXjE2IHx8ID49MTRcIlxuICB9LFxuICBcImxpbnQtc3RhZ2VkXCI6IHtcbiAgICBcIioue2pzLGNzcyx0cyx0c3gsanN4fVwiOiBbXG4gICAgICBcInByZXR0aWVyIC0td3JpdGVcIixcbiAgICAgIFwiZXNsaW50IC0tZml4XCJcbiAgICBdLFxuICAgIFwieyEocGFja2FnZSkqLmpzb24sKi5jb2RlLXNuaXBwZXRzLC4hKGJyb3dzZXJzbGlzdCkqcmN9XCI6IFtcbiAgICAgIFwicHJldHRpZXIgLS13cml0ZS0tcGFyc2VyIGpzb25cIlxuICAgIF0sXG4gICAgXCJwYWNrYWdlLmpzb25cIjogW1xuICAgICAgXCJwcmV0dGllciAtLXdyaXRlXCJcbiAgICBdLFxuICAgIFwiKi57c2NzcyxsZXNzLHN0eWwsaHRtbH1cIjogW1xuICAgICAgXCJzdHlsZWxpbnQgLS1maXhcIixcbiAgICAgIFwicHJldHRpZXIgLS13cml0ZVwiXG4gICAgXSxcbiAgICBcIioubWRcIjogW1xuICAgICAgXCJwcmV0dGllciAtLXdyaXRlXCJcbiAgICBdXG4gIH0sXG4gIFwiY29uZmlnXCI6IHtcbiAgICBcImNvbW1pdGl6ZW5cIjoge1xuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXG4gICAgfVxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3RzL2Zyb250ZW5kL2V2ZWZ5b3UvcmVhY3QtZXZlZnlvdS1hZG1pbi9idWlsZC92aXRlL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5JztcbmltcG9ydCBwdXJnZUljb25zIGZyb20gJ3ZpdGUtcGx1Z2luLXB1cmdlLWljb25zJztcbmltcG9ydCBWaXRlUGx1Z2luQ2VydGlmaWNhdGUgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0JztcbmltcG9ydCB7IGNvbmZpZ0h0bWxQbHVnaW4gfSBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IHsgY29uZmlnUHdhQ29uZmlnIH0gZnJvbSAnLi9wd2EnO1xuaW1wb3J0IHsgY29uZmlnTW9ja1BsdWdpbiB9IGZyb20gJy4vbW9jayc7XG5pbXBvcnQgeyBjb25maWdDb21wcmVzc1BsdWdpbiB9IGZyb20gJy4vY29tcHJlc3MnO1xuLy8gaW1wb3J0IHsgY29uZmlnU3R5bGVJbXBvcnRQbHVnaW4gfSBmcm9tICcuL3N0eWxlSW1wb3J0JztcbmltcG9ydCB7IGNvbmZpZ1Zpc3VhbGl6ZXJDb25maWcgfSBmcm9tICcuL3Zpc3VhbGl6ZXInO1xuLy8gaW1wb3J0IHsgY29uZmlnVGhlbWVQbHVnaW4gfSBmcm9tICcuL3RoZW1lJztcbmltcG9ydCB7IGNvbmZpZ0ltYWdlbWluUGx1Z2luIH0gZnJvbSAnLi9pbWFnZW1pbic7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCBXaW5kaUNTUyBmcm9tICd2aXRlLXBsdWdpbi13aW5kaWNzcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52OiBJbXBvcnRNZXRhRW52LCBpc0J1aWxkOiBib29sZWFuKSB7XG4gIGNvbnN0IHtcbiAgICBWSVRFX1VTRV9JTUFHRU1JTixcbiAgICBWSVRFX1VTRV9NT0NLLFxuICAgIFZJVEVfTEVHQUNZLFxuICAgIFZJVEVfQlVJTERfQ09NUFJFU1MsXG4gICAgVklURV9CVUlMRF9DT01QUkVTU19ERUxFVEVfT1JJR0lOX0ZJTEUsXG4gIH0gPSB2aXRlRW52O1xuXG4gIGNvbnN0IHZpdGVQbHVnaW5zOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPSBbXG4gICAgcmVhY3QoKSxcbiAgICB0c2NvbmZpZ1BhdGhzKHtcbiAgICAgIGlnbm9yZUNvbmZpZ0Vycm9yczogdHJ1ZVxuICAgIH0pLFxuICAgIFZpdGVQbHVnaW5DZXJ0aWZpY2F0ZSh7XG4gICAgICBzb3VyY2U6ICdjb2RpbmcnLFxuICAgIH0pLFxuICBdO1xuXG4gIC8vIHZpdGUtcGx1Z2luLXdpbmRpY3NzXG4gIHZpdGVQbHVnaW5zLnB1c2goV2luZGlDU1MoKSk7XG5cbiAgLy8gQHZpdGVqcy9wbHVnaW4tbGVnYWN5XG4gIFZJVEVfTEVHQUNZICYmIGlzQnVpbGQgJiYgdml0ZVBsdWdpbnMucHVzaChsZWdhY3koKSk7XG5cbiAgLy8gdml0ZS1wbHVnaW4taHRtbFxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ0h0bWxQbHVnaW4odml0ZUVudiwgaXNCdWlsZCkpO1xuXG4gIC8vIHZpdGUtcGx1Z2luLXN2Z3IgXHU1QzA2c3ZnXHU4RjZDXHU0RTNBcmVhY3RcdTdFQzRcdTRFRjZcbiAgdml0ZVBsdWdpbnMucHVzaChzdmdyKCkpO1xuXG4gIC8vIHZpdGUtcGx1Z2luLW1vY2tcbiAgVklURV9VU0VfTU9DSyAmJiB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ01vY2tQbHVnaW4oaXNCdWlsZCkpO1xuXG4gIC8vIHZpdGUtcGx1Z2luLXB1cmdlLWljb25zXG4gIHZpdGVQbHVnaW5zLnB1c2gocHVyZ2VJY29ucygpKTtcblxuICAvLyB2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQgYW50ZDVcdTRFMERcdTk3MDBcdTg5ODFcdTYyNEJcdTUyQThcdTVGMTVcdTUxNjVcdTY4MzdcdTVGMEZcdTRFODZcbiAgLy8gdml0ZVBsdWdpbnMucHVzaChjb25maWdTdHlsZUltcG9ydFBsdWdpbihpc0J1aWxkKSk7XG5cbiAgLy8gcm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXG4gIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnVmlzdWFsaXplckNvbmZpZygpKTtcblxuICAvLyB2aXRlLXBsdWdpbi10aGVtZSBhbnRkNSBcdTc2ODRcdTRFM0JcdTk4OThcdTRGN0ZcdTc1Mjh0b2tlblx1NzY4NGNzc2luanNcdTY1QjlcdTVGMEZcdUZGMENcdThGRDlcdTRFMkFcdTYzRDJcdTRFRjZcdTUzRUZcdTgwRkRcdTRFMERcdTkwMDJcdTc1MjhcdTRFODZcbiAgLy8gdml0ZVBsdWdpbnMucHVzaChjb25maWdUaGVtZVBsdWdpbihpc0J1aWxkKSk7XG5cbiAgLy8gVGhlIGZvbGxvd2luZyBwbHVnaW5zIG9ubHkgd29yayBpbiB0aGUgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICBpZiAoaXNCdWlsZCkge1xuICAgIC8vIHZpdGUtcGx1Z2luLWltYWdlbWluXG4gICAgVklURV9VU0VfSU1BR0VNSU4gJiYgdml0ZVBsdWdpbnMucHVzaChjb25maWdJbWFnZW1pblBsdWdpbigpKTtcblxuICAgIC8vIHJvbGx1cC1wbHVnaW4tZ3ppcFxuICAgIHZpdGVQbHVnaW5zLnB1c2goXG4gICAgICBjb25maWdDb21wcmVzc1BsdWdpbihWSVRFX0JVSUxEX0NPTVBSRVNTLCBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRSksXG4gICAgKTtcblxuICAgIC8vIHZpdGUtcGx1Z2luLXB3YVxuICAgIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnUHdhQ29uZmlnKHZpdGVFbnYpKTtcbiAgfVxuXG4gIHJldHVybiB2aXRlUGx1Z2lucztcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxccHJvamVjdHNcXFxcZnJvbnRlbmRcXFxcZXZlZnlvdVxcXFxyZWFjdC1ldmVmeW91LWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxccHJvamVjdHNcXFxcZnJvbnRlbmRcXFxcZXZlZnlvdVxcXFxyZWFjdC1ldmVmeW91LWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxodG1sLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9wcm9qZWN0cy9mcm9udGVuZC9ldmVmeW91L3JlYWN0LWV2ZWZ5b3UtYWRtaW4vYnVpbGQvdml0ZS9wbHVnaW5zL2h0bWwudHNcIjsvKipcbiAqIFBsdWdpbiB0byBtaW5pbWl6ZSBhbmQgdXNlIGVqcyB0ZW1wbGF0ZSBzeW50YXggaW4gaW5kZXguaHRtbC5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4taHRtbFxuICovXG5pbXBvcnQgaHRtbCBmcm9tICd2aXRlLXBsdWdpbi1odG1seCc7XG5pbXBvcnQgcGtnIGZyb20gJy4uLy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgeyBHTE9CX0NPTkZJR19GSUxFX05BTUUgfSBmcm9tICcuLi8uLi9jb25zdGFudCc7XG5cbmV4cG9ydCBjb25zdCBnZXRBcHBDb25maWdTcmMgPSAoZW52OiBJbXBvcnRNZXRhRW52KSA9PiB7XG4gIGNvbnN0IHsgVklURV9QVUJMSUNfUEFUSCB9ID0gZW52O1xuICBjb25zdCBwYXRoID0gVklURV9QVUJMSUNfUEFUSC5lbmRzV2l0aCgnLycpID8gVklURV9QVUJMSUNfUEFUSCA6IGAke1ZJVEVfUFVCTElDX1BBVEh9L2A7XG4gIHJldHVybiBgJHtwYXRoIHx8ICcvJ30ke0dMT0JfQ09ORklHX0ZJTEVfTkFNRX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEFwcENvbmZpZ1NyY1VybCA9IChlbnY6IEltcG9ydE1ldGFFbnYpID0+IHtcbiAgcmV0dXJuIGdldEFwcENvbmZpZ1NyYyhlbnYpLmNvbmNhdChgP3Y9JHtwa2cudmVyc2lvbn0tJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdIdG1sUGx1Z2luKGVudjogSW1wb3J0TWV0YUVudiwgaXNCdWlsZDogYm9vbGVhbikge1xuICBjb25zdCB7IFZJVEVfR0xPQl9BUFBfVElUTEUgfSA9IGVudjtcbiAgcmV0dXJuIGh0bWwoe1xuICAgIG1pbmlmeTogaXNCdWlsZCxcbiAgICBwYWdlOiB7XG4gICAgICBpbmplY3Q6IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRpdGxlOiBWSVRFX0dMT0JfQVBQX1RJVExFLFxuICAgICAgICAgIGluamVjdFNjcmlwdDogaXNCdWlsZCA/IGA8c2NyaXB0IHNyYz1cIiR7Z2V0QXBwQ29uZmlnU3JjKGVudil9XCIgdHlwZT1cIm1vZHVsZVwiPjwvc2NyaXB0PmAgOiAnJyxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH0pO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxmcm9udGVuZFxcXFxldmVmeW91XFxcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxmcm9udGVuZFxcXFxldmVmeW91XFxcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHB3YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamVjdHMvZnJvbnRlbmQvZXZlZnlvdS9yZWFjdC1ldmVmeW91LWFkbWluL2J1aWxkL3ZpdGUvcGx1Z2lucy9wd2EudHNcIjsvKipcbiAqIFplcm8tY29uZmlnIFBXQSBmb3IgVml0ZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLXB3YVxuICovXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ1B3YUNvbmZpZyhlbnY6IEltcG9ydE1ldGFFbnYpIHtcbiAgY29uc3QgeyBWSVRFX1VTRV9QV0EsIFZJVEVfR0xPQl9BUFBfVElUTEUsIFZJVEVfR0xPQl9BUFBfU0hPUlRfTkFNRSB9ID0gZW52O1xuXG4gIGlmIChWSVRFX1VTRV9QV0EpIHtcbiAgICAvLyB2aXRlLXBsdWdpbi1wd2FcbiAgICBjb25zdCBwd2FQbHVnaW4gPSBWaXRlUFdBKHtcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXG4gICAgICAgIHNob3J0X25hbWU6IFZJVEVfR0xPQl9BUFBfU0hPUlRfTkFNRSxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcuL3Jlc291cmNlL2ltZy9wd2EtMTkyeDE5Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnLi9yZXNvdXJjZS9pbWcvcHdhLTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gcHdhUGx1Z2luO1xuICB9XG4gIHJldHVybiBbXTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxccHJvamVjdHNcXFxcZnJvbnRlbmRcXFxcZXZlZnlvdVxcXFxyZWFjdC1ldmVmeW91LWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxccHJvamVjdHNcXFxcZnJvbnRlbmRcXFxcZXZlZnlvdVxcXFxyZWFjdC1ldmVmeW91LWFkbWluXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxtb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9wcm9qZWN0cy9mcm9udGVuZC9ldmVmeW91L3JlYWN0LWV2ZWZ5b3UtYWRtaW4vYnVpbGQvdml0ZS9wbHVnaW5zL21vY2sudHNcIjsvKlxuICogQEF1dGhvcjogRXZlZnlvdUZFXG4gKiBARGF0ZTogMjAyMy0wNy0zMSAxNDoxODo1MFxuICogQEZpbGVQYXRoOiBcXHJlYWN0LWV2ZWZ5b3UtYWRtaW5cXGJ1aWxkXFx2aXRlXFxwbHVnaW5zXFxtb2NrLnRzXG4gKiBARGVzY3JpcHRpb246IFxuICogRXZlcnlvbmUgaXMgY29taW5nIHRvIHRoZSB3b3JsZCBpIGxpdmUgaW4sIGFzIGkgYW0gZ29pbmcgdG8gdGhlIHdvcmxkIGxpdmVzIGZvciB5b3UuIFx1NEVCQVx1NEVCQVx1NzY4Nlx1NUY4MFx1NjIxMVx1NEUxNlx1NzU0Q1x1RkYwQ1x1NjIxMVx1NEUzQVx1NEUxNlx1NzU0Q1x1NEUyRFx1NEVCQVx1NEVCQVx1MzAwMlxuICogQ29weXJpZ2h0IChjKSAyMDIzIGJ5IEV2ZWZ5b3VGRS9ldmVmLCBBbGwgUmlnaHRzIFJlc2VydmVkLiBcbiAqL1xuLyoqXG4gKiBNb2NrIHBsdWdpbiBmb3IgZGV2ZWxvcG1lbnQgYW5kIHByb2R1Y3Rpb24uXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLW1vY2tcbiAqL1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ01vY2tQbHVnaW4oaXNCdWlsZDogYm9vbGVhbikge1xuICByZXR1cm4gdml0ZU1vY2tTZXJ2ZSh7XG4gICAgaWdub3JlOiAvXlxcXy8sXG4gICAgbW9ja1BhdGg6ICdtb2NrJyxcbiAgICBsb2NhbEVuYWJsZWQ6IGlzQnVpbGQsXG4gICAgcHJvZEVuYWJsZWQ6ICFpc0J1aWxkLFxuICAgIHdhdGNoRmlsZXM6IHRydWUsXG4gICAgbG9nZ2VyOiB0cnVlLFxuICAgIGluamVjdEZpbGU6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9tYWluLnRzeFwiKSxcbiAgICBpbmplY3RDb2RlOiBgXG4gICAgICBpbXBvcnQgeyBzZXR1cFByb2RNb2NrU2VydmVyIH0gZnJvbSAnLi4vLi4vbW9jay9fY3JlYXRlUHJvZHVjdGlvblNlcnZlcic7XG4gICAgICBjb25zb2xlLmxvZygnd29yayAuLi4uLi4uLi4uLi4pXG4gICAgICBzZXR1cFByb2RNb2NrU2VydmVyKCk7XG4gICAgICBgLFxuICB9KTtcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcY29tcHJlc3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3RzL2Zyb250ZW5kL2V2ZWZ5b3UvcmVhY3QtZXZlZnlvdS1hZG1pbi9idWlsZC92aXRlL3BsdWdpbnMvY29tcHJlc3MudHNcIjsvKipcbiAqIFVzZWQgdG8gcGFja2FnZSBhbmQgb3V0cHV0IGd6aXAuIE5vdGUgdGhhdCB0aGlzIGRvZXMgbm90IHdvcmsgcHJvcGVybHkgaW4gVml0ZSwgdGhlIHNwZWNpZmljIHJlYXNvbiBpcyBzdGlsbCBiZWluZyBpbnZlc3RpZ2F0ZWRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tY29tcHJlc3Npb25cbiAqL1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcbmltcG9ydCBjb21wcmVzc1BsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdDb21wcmVzc1BsdWdpbihcbiAgY29tcHJlc3M6ICdnemlwJyB8ICdicm90bGknIHwgJ25vbmUnLFxuICBkZWxldGVPcmlnaW5GaWxlID0gZmFsc2UsXG4pOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSB7XG4gIGNvbnN0IGNvbXByZXNzTGlzdCA9IGNvbXByZXNzLnNwbGl0KCcsJyk7XG5cbiAgY29uc3QgcGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXTtcblxuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcbiAgICBwbHVnaW5zLnB1c2goXG4gICAgICBjb21wcmVzc1BsdWdpbih7XG4gICAgICAgIGV4dDogJy5neicsXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGUsXG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcbiAgICBwbHVnaW5zLnB1c2goXG4gICAgICBjb21wcmVzc1BsdWdpbih7XG4gICAgICAgIGV4dDogJy5icicsXG4gICAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZSxcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHBsdWdpbnM7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcdmlzdWFsaXplci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamVjdHMvZnJvbnRlbmQvZXZlZnlvdS9yZWFjdC1ldmVmeW91LWFkbWluL2J1aWxkL3ZpdGUvcGx1Z2lucy92aXN1YWxpemVyLnRzXCI7LyoqXG4gKiBQYWNrYWdlIGZpbGUgdm9sdW1lIGFuYWx5c2lzXG4gKi9cbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IHsgaXNSZXBvcnRNb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ1Zpc3VhbGl6ZXJDb25maWcoKSB7XG4gIGlmIChpc1JlcG9ydE1vZGUoKSkge1xuICAgIGNvbnNvbGUubG9nKCdpc1JlcG9ydE1vZGUoKScsIGlzUmVwb3J0TW9kZSgpKVxuICAgIHJldHVybiB2aXN1YWxpemVyKHtcbiAgICAgIGZpbGVuYW1lOiAnLi9ub2RlX21vZHVsZXMvLmNhY2hlL3Zpc3VhbGl6ZXIvc3RhdHMuaHRtbCcsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgIH0pIGFzIFBsdWdpbk9wdGlvbjtcbiAgfVxuICByZXR1cm4gW107XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXGZyb250ZW5kXFxcXGV2ZWZ5b3VcXFxccmVhY3QtZXZlZnlvdS1hZG1pblxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcaW1hZ2VtaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3RzL2Zyb250ZW5kL2V2ZWZ5b3UvcmVhY3QtZXZlZnlvdS1hZG1pbi9idWlsZC92aXRlL3BsdWdpbnMvaW1hZ2VtaW4udHNcIjsvLyBJbWFnZSByZXNvdXJjZSBmaWxlcyB1c2VkIHRvIGNvbXByZXNzIHRoZSBvdXRwdXQgb2YgdGhlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4taW1hZ2VtaW5cbmltcG9ydCB2aXRlSW1hZ2VtaW4gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2VtaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnSW1hZ2VtaW5QbHVnaW4oKSB7XG4gIGNvbnN0IHBsdWdpbiA9IHZpdGVJbWFnZW1pbih7XG4gICAgZ2lmc2ljbGU6IHtcbiAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxuICAgICAgaW50ZXJsYWNlZDogZmFsc2UsXG4gICAgfSxcbiAgICBvcHRpcG5nOiB7XG4gICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcbiAgICB9LFxuICAgIG1vempwZWc6IHtcbiAgICAgIHF1YWxpdHk6IDIwLFxuICAgIH0sXG4gICAgcG5ncXVhbnQ6IHtcbiAgICAgIHF1YWxpdHk6IFswLjgsIDAuOV0sXG4gICAgICBzcGVlZDogNCxcbiAgICB9LFxuICAgIHN2Z286IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdyZW1vdmVWaWV3Qm94JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KTtcbiAgcmV0dXJuIHBsdWdpbjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFUsU0FBZ0Msb0JBQW9COzs7QUNBVCxTQUFTLGdCQUFnQjtBQUV6WSxJQUFNLGVBQWU7QUFlckIsU0FBUyxrQkFBa0IsT0FBZSxRQUF1QixXQUFXO0FBQ2pGLFNBQU8sU0FBUyxPQUFPO0FBQUEsSUFDckI7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FDcEJBLFNBQVMsZUFBZTtBQUtqQixTQUFTLG1CQUFtQixPQUFPLE9BQU87QUFDL0MsUUFBTSxXQUFX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
