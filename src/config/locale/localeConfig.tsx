import { ReactComponent as EnUsSvg } from "@/assets/header/en_US.svg";
import { ReactComponent as ZhCnSvg } from "@/assets/header/zh_CN.svg";
import enUS from '@/locales/en-us';
import zhCN from '@/locales/zh-cn';
import { Locale } from "@models/auth";
import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import React from "react";

export enum LocaleTypeEnum {
  enUS='en-us',
  zhCN='zh-cn'
}

interface LocaleConfig {
  name: string;
  key: Locale;
  messages: Record<string,string>;
  icon: React.ReactNode;
  antdMessages: any
}

export const localeConfigs: LocaleConfig[] = [
  {
    name: 'English',
    key: 'en-us',
    messages: enUS,
    icon: <EnUsSvg />,
    antdMessages: antdEnUS,
  },
  {
    name: '简体中文',
    key: 'zh-cn',
    messages: zhCN,
    icon: <ZhCnSvg />,
    antdMessages: antdZhCN,
  }
];