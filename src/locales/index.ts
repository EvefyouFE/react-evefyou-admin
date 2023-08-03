import React from 'react';
import enUS from './en-us';
import { FormattedMessage, MessageDescriptor, PrimitiveType, createIntl, createIntlCache, useIntl } from 'react-intl';
import { localeConfig } from "@/config/locale";
import { getRecoil } from "recoil-nexus";
import { userAtom } from "@/stores/user";

export type Id = keyof typeof enUS;
type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;
export type Values = Record<string, React.ReactNode | PrimitiveType | FormatXMLElementFn<React.ReactNode, React.ReactNode>>;
interface Props extends MessageDescriptor {
  id: Id;
  values?: Values;
}
type FormatMessageProps = (descriptor: Props, values?: Values) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;
  const formatById = (id: Id, values?: Values) => formatMessage({ id }, values);
  return {
    ...rest,
    formatMessage,
    formatById
  };
};
export function formatMessage({ id, values }: Props) {
  return React.createElement(FormattedMessage, {
    id,
    values,
    key: id
  })
}

export function formatById(id: Id, values?: Values) {
  return formatMessage({ id, values })
}

const getLocaleMessage = (locale: string) => {
  const lang = localeConfig.find((item) => {
    return item.key === locale.toLowerCase();
  });
  return lang?.messages;
};
const cacheZh = createIntlCache();
export const IntlZh = createIntl(
  {
    locale: 'zh-CN',
    messages: getLocaleMessage('zh-cn')
  },
  cacheZh
)
const cacheEn = createIntlCache();
export const IntlEn = createIntl(
  {
    locale: 'en-US',
    messages: getLocaleMessage('en-us')
  },
  cacheEn
)

export function formatOutside(id: Id, values?: Values) {
  const locale = getRecoil(userAtom).userInfo?.locale ?? 'zh-cn'
  switch (locale) {
    case 'en-us':
      return IntlEn.formatMessage({ id }, values)?.toLocaleString()??id
    case 'zh-cn':
    default:
      return IntlZh.formatMessage({ id }, values)?.toLocaleString()??id
  }
}