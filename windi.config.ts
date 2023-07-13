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