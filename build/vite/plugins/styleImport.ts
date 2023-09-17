// /*
//  * @Author: EvefyouFE
//  * @Date: 2023-08-18 19:40:11
//  * @FilePath: \react-evefyou-admin\build\vite\plugins\styleImport.ts
//  * @Description:
//  * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
//  * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
//  */
// /**
//  *  Introduces component library styles on demand.
//  * https://github.com/anncwb/vite-plugin-style-import
//  */
// import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';

// export function configStyleImportPlugin(_isBuild: boolean) {
//   if (!_isBuild) {
//     return [];
//   }
//   const styleImportPlugin = createStyleImportPlugin({
//     libs: [
//       {
//         libraryName: 'react-evefyou-components',
//         esModule: true,
//         resolveStyle: (name) => {
//           console.log('name', name)
//           return `react-evefyou-components/dist/css/${name}"}`
//         },
//       },
//     ],
//     resolves: [VxeTableResolve()],
//   });
//   return styleImportPlugin;
// }
