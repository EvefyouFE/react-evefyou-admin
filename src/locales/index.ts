import React from 'react';
import { MessageValues, useBaseLocale, LocaleFormatMessageProps, formatBaseById, LocaleInfo } from 'react-evefyou-app';
import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import enUS from './en_US';
import zhCN from './zh_CN';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import { IntlShape } from 'react-intl';

export const useLocale = () => {
  const locale: Omit<IntlShape, "formatMessage"> & {
    formatMessage: LocaleFormatMessageProps<keyof typeof enUS>;
    formatById: (id: keyof typeof enUS, values?: MessageValues) => string;
  } = useBaseLocale<keyof typeof enUS>()
  return locale
}
export function formatById(id: keyof typeof enUS, values?: MessageValues): React.ReactNode {
  return formatBaseById(id, values)
}


export const locales: LocaleInfo[] = [
  {
    name: 'English',
    key: 'en-us',
    messages: enUS,
    icon: React.createElement(EnUsSvg),
    antdMessages: antdEnUS,
  },
  {
    name: '简体中文',
    key: 'zh-cn',
    messages: zhCN,
    icon: React.createElement(ZhCnSvg),
    antdMessages: antdZhCN,
  },
];
