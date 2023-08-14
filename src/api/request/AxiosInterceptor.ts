/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useEffect } from "react";
import type { AxiosError, AxiosResponse } from 'axios';
import { getMessageHelper } from '@/hooks/web';
import { ResultEnum, SessionTimeoutProcessingEnum } from '@/enums';
import { useLocale } from "@/locales";
import { useUserRecoilState } from "@/stores/user";
import { useErrorLogRecoilState } from "@/stores/errorlog";
import { DEFAULT_PROJECT_CONFIG } from "@/config/app/project";
import { defHttp } from ".";

const { createErrorModal } = getMessageHelper();

const stp = DEFAULT_PROJECT_CONFIG.sessionTimeoutProcessing;

export const AxiosInterceptor = () => {
  const { formatById } = useLocale()
  const [, { setIsSessionTimeout, setToken, logout }] = useUserRecoilState()
  const [errorlog, { addAjaxErrorInfo }] = useErrorLogRecoilState()

  const handleResInterceptor = useCallback((res: AxiosResponse<Res>) => {
    const { data } = res
    if (!data) return;
    const { code } = data
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    switch (code) {
      case ResultEnum.TIMEOUT:
        setToken('');
        logout(true);
        break;
      default:
    }
  }, [logout, setToken])

  const handleErrorInterceptor = useCallback((error: any) => {
    const { response, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const status = response?.status
    let errMessage: React.ReactNode = '';

    switch (status) {
      case 400:
        errMessage = `${msg}`;
        break;
      // 401: Not logged in
      // Jump to the login page if not logged in, and carry the path of the current page
      // Return to the current page after successful login. This step needs to be operated on the login page.
      case 401:
        setToken('')
        errMessage = msg || formatById('sys.api.error.msg.401');
        if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
          setIsSessionTimeout(true)
        } else {
          logout(true)
        }
        break;
      case 403:
        errMessage = formatById('sys.api.error.msg.403');
        break;
      // 404请求不存在
      case 404:
        errMessage = formatById('sys.api.error.msg.404');
        break;
      case 405:
        errMessage = formatById('sys.api.error.msg.405');
        break;
      case 408:
        errMessage = formatById('sys.api.error.msg.408');
        break;
      case 500:
        errMessage = formatById('sys.api.error.msg.500');
        break;
      case 501:
        errMessage = formatById('sys.api.error.msg.501');
        break;
      case 502:
        errMessage = formatById('sys.api.error.msg.502');
        break;
      case 503:
        errMessage = formatById('sys.api.error.msg.503');
        break;
      case 504:
        errMessage = formatById('sys.api.error.msg.504');
        break;
      case 505:
        errMessage = formatById('sys.api.error.msg.505');
        break;
      default:
    }

    if (errMessage) {
      if (errorMessageMode === 'modal') {
        createErrorModal({ title: formatById('sys.api.error.tip'), content: errMessage });
      } else if (errorMessageMode === 'message') {
        error({ content: errMessage, key: `global_error_message_status_${status}` });
      }
    }
  }, [formatById, logout, setIsSessionTimeout, setToken])

  useEffect(() => {
    const errorInterceptor = (error: AxiosError) => {
      addAjaxErrorInfo(error);
      return error;
    }
    const interceptor = defHttp.getAxios().interceptors.response.use(response => response, errorInterceptor)
    return () => defHttp.getAxios().interceptors.response.eject(interceptor)
  }, [addAjaxErrorInfo, errorlog])

  useEffect(() => {
    const resInterceptor = (res: AxiosResponse<Res>) => {
      handleResInterceptor(res)
      return res;
    }
    const errorInterceptor = (error: AxiosError) => {
      handleErrorInterceptor(error)
      return error;
    }
    const interceptor = defHttp.getAxios().interceptors.response.use(resInterceptor, errorInterceptor)
    return () => defHttp.getAxios().interceptors.response.eject(interceptor)
  }, [handleResInterceptor, handleErrorInterceptor])
  return null
}