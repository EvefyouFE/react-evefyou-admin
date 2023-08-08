import { generate } from '@ant-design/colors';
import { theme } from 'antd';
import { MapToken } from "antd/es/theme/interface";
import { divide, is } from 'ramda';

export const ratio = (oldVal: number, newVal: number) => divide(newVal, oldVal);

export function ratioFontSizeTheme(fontSize: number) {
    const { defaultAlgorithm, defaultSeed } = theme;
    const mapToken: MapToken = defaultAlgorithm(defaultSeed);
    const ratioRes = ratio(mapToken.fontSize, fontSize);
    Object.keys(mapToken).forEach((key) => {
        if (is(Number, mapToken[key as keyof MapToken])) {
            (mapToken[key as keyof MapToken] as number) *= ratioRes;
        }
    });
    return mapToken;
}

export function generateAntColors(
    color: string,
    th: GenerateTheme = 'default',
) {
    return generate(color, {
        theme: th,
    });
}
