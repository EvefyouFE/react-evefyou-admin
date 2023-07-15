import React from 'react';
import enUS from './en-us';
import { FormattedMessage, MessageDescriptor, PrimitiveType, useIntl } from 'react-intl';

type Id = keyof typeof enUS;
type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;
type Values = Record<string, React.ReactNode | PrimitiveType | FormatXMLElementFn<React.ReactNode, React.ReactNode>>;
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
    key:id 
  })
}

export function formatById(id: Id, values?: Values) {
  return formatMessage({ id, values })
}