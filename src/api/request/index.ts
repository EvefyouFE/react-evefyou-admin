/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged
import { ReactNode, createContext } from "react";
import { clone, is, isEmpty, isNil } from "ramda";
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { useGlobSetting } from '@/hooks/setting';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums';
import { deepMerge } from '@/utils/object';

import { getToken } from "@/utils/auth";
import { formatRequestDate, joinTimestamp, setObjToUrlParams } from "./helper";
import { formatById, formatOutside } from "@/locales";
import { getMessageHelper } from "@/hooks/web";
import { AxiosRetry } from "./axiosRetry";

// eslint-disable-next-line react-hooks/rules-of-hooks
const globSetting = useGlobSetting();
const { urlPrefix = '' } = globSetting;


const beforeRequestHook = (config: AxiosRequestConfig, options: RequestOptions) => {
  const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

  if (joinPrefix) {
    config.url = `${urlPrefix}${config.url ?? ''}`;
  }

  if (apiUrl && is(String, apiUrl)) {
    config.url = `${apiUrl}${config.url ?? ''}`;
  }
  const params = config.params || {};
  const data = config.data || false;
  formatDate && data && !is(String, data) && formatRequestDate(data);
  if (config.method?.toUpperCase() === RequestEnum.GET) {
    if (!is(String, params)) {
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
    } else {
      // 兼容restful风格
      config.url = `${(config.url ?? '') + params}${joinTimestamp(joinTime, true)}`;
      config.params = undefined;
    }
  } else if (!is(String, params)) {
    formatDate && formatRequestDate(params);
    if (
      Reflect.has(config, 'data') &&
      config.data &&
      (Object.keys(config.data).length > 0 || config.data instanceof FormData)
    ) {
      config.data = data;
      config.params = params;
    } else {
      // 非GET请求如果没有提供data，则将params视为data
      config.data = params;
      config.params = undefined;
    }
    if (joinParamsToUrl) {
      config.url = setObjToUrlParams(
        config.url as string,
        { ...config.params, ...config.data },
      );
    }
  } else {
    // 兼容restful风格
    config.url += params;
    config.params = undefined;
  }
  return config;
}

// 请求之前处理config
/**
 * @description: 请求拦截器处理
 */

const requestInterceptors = (config: InternalAxiosRequestConfig, options: CreateAxiosOptions) => {
  // 请求之前处理config
  const token = getToken();
  if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
    // jwt token
    (config as Recordable).headers.Authorization = options.authenticationScheme
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      ? `${options.authenticationScheme} ${token}`
      : token;
  }
  return config;
}

/**
 * @description: 响应拦截器处理
 */
const responseInterceptors = (res: AxiosResponse<any>) => res

const { createMessage, createErrorModal, createSuccessModal } = getMessageHelper();
const transformResponseHook = (res: AxiosResponse<Res>, options: RequestOptions) => {
  const { isTransformResponse, isReturnNativeResponse } = options;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  if (isReturnNativeResponse) {
    return res;
  }
  // 不进行任何处理，直接返回
  // 用于页面代码可能需要直接获取code，data，message这些信息时开启
  if (!isTransformResponse) {
    return res.data;
  }
  // 错误的时候返回

  const { data } = res;
  if (!data) {
    // return '[HTTP] Request has no return value';
    throw new Error(formatOutside('sys.api.apiRequestFailed'));
  }
  //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
  const { code, data: result, message } = data;

  // 这里逻辑可以根据项目进行修改
  const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
  if (hasSuccess) {
    let successMsg = message;

    if (isNil(successMsg) || isEmpty(successMsg)) {
      successMsg = formatOutside(`sys.api.operationSuccess`);
    }

    if (options.successMessageMode === 'modal') {
      createSuccessModal({ title: formatOutside('sys.api.success.tip'), content: successMsg });
    } else if (options.successMessageMode === 'message') {
      createMessage.success(successMsg);
    }
    return result;
  }

  // 在此处根据自己项目的实际情况对不同的code执行不同的操作
  // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
  let timeoutMsg = '';
  switch (code) {
    case ResultEnum.TIMEOUT:
      timeoutMsg = formatOutside('sys.api.timeoutMessage');
      break;
    default:
      if (message) {
        timeoutMsg = message;
      }
  }

  // errorMessageMode='modal'的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
  // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
  if (options.errorMessageMode === 'modal') {
    createErrorModal({ title: formatOutside('sys.api.error.tip'), content: timeoutMsg });
  } else if (options.errorMessageMode === 'message') {
    createMessage.error(timeoutMsg);
  }

  throw new Error(timeoutMsg || formatOutside('sys.api.apiRequestFailed'));
}


/**
 * @description: 响应错误处理
 */
const responseInterceptorsCatch = (axiosInstance: AxiosResponse, error: any) => {
  const { code, message, config } = error || {};
  const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
  const err: string = error?.toString?.() ?? '';
  let errMessage: ReactNode = '';

  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }

  try {
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = formatById('sys.api.apiTimeoutMessage');
    }
    if (err?.includes('Network Error')) {
      errMessage = formatById('sys.api.networkExceptionMsg');
    }

    if (errMessage) {
      if (errorMessageMode === 'modal') {
        createErrorModal({ title: formatById('sys.api.error.tip'), content: errMessage });
      } else if (errorMessageMode === 'message') {
        createMessage.error(errMessage);
      }
      return Promise.reject(error);
    }
  } catch (error) {
    throw new Error(error as string);
  }

  // 添加自动重试机制 保险起见 只针对GET请求
  const retryRequest = new AxiosRetry();
  const { isOpenRetry } = config.requestOptions.retryRequest;
  config.method?.toUpperCase() === RequestEnum.GET &&
    isOpenRetry &&
    // @ts-ignore
    retryRequest.retry(axiosInstance, error);
  return Promise.reject(error);
}

export const defaultTransform: AxiosTransform = {
  beforeRequestHook,
  requestInterceptors,
  responseInterceptors,
  transformResponseHook,
  responseInterceptorsCatch
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(defaultTransform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(defHttp.getAxios(), {
    apply: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
    get: () => {
      throw new Error('You must wrap your component in an AxiosProvider');
    },
  }),
);

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
