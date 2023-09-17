/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:26:23
 * @FilePath: \react-evefyou-admin\windi.config.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'
import { generateModifyVars } from './build/generate/generateModifyVars';

const vars = generateModifyVars();
const primary = vars['primary-color'];

export default defineConfig({
    darkMode: 'class',
    safelist: 'p-3 p-4 p-5',
    theme: {
        extend: {
            colors: {
                primary,
                headerLeftTiggerHover: '#f1f1f1',
                textColor: 'c9d1d9',
            },
            height: {
                layoutTopHeight: '3.5rem',
            }
        },
    },
    plugins: [formsPlugin],
    preflight: false,
})