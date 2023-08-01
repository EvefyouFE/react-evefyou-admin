import { generate } from '@ant-design/colors';
import { theme } from 'antd';
import { divide } from 'ramda';

export const ratio = (oldVal: number, newVal: number) => divide(newVal, oldVal);

export function ratioFontSizeTheme (fontSize: number) {
    const { defaultAlgorithm, defaultSeed } = theme;
    let mapToken: { [key: string]: any } = defaultAlgorithm(defaultSeed);
    const ratioRes = ratio(mapToken.fontSize, fontSize);
    Object.keys(mapToken).forEach((key) => {
        if (typeof mapToken[key] == 'number') {
            mapToken[key] = ratioRes * mapToken[key];
        }
    });
    return mapToken;
};

export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
    return generate(color, {
        theme,
    });
}