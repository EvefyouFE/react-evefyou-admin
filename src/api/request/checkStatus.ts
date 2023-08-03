
import { SessionTimeoutProcessingEnum } from '@/enums';
import { useMessage } from "@/hooks/web";
import React from "react";
import { DEFAULT_PROJECT_CONFIG } from "@/config/app/project"
import { UserState, useUserRecoilState } from "@/stores/user";
import { formatOutside } from "@/locales";

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const stp = DEFAULT_PROJECT_CONFIG.sessionTimeoutProcessing;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  // const [, {setIsSessionTimeout, logout}] = useUserRecoilState();
  let errMessage: React.ReactNode = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      let userState: Partial<UserState> = {};
      userState.token = undefined
      errMessage = msg || formatOutside('sys.api.error.msg.401');
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        // setIsSessionTimeout(true)
      } else {
        // logout(true)
      }
      break;
    case 403:
      errMessage = formatOutside('sys.api.error.msg.403');
      break;
    // 404请求不存在
    case 404:
      errMessage = formatOutside('sys.api.error.msg.404');
      break;
    case 405:
      errMessage = formatOutside('sys.api.error.msg.405');
      break;
    case 408:
      errMessage = formatOutside('sys.api.error.msg.408');
      break;
    case 500:
      errMessage = formatOutside('sys.api.error.msg.500');
      break;
    case 501:
      errMessage = formatOutside('sys.api.error.msg.501');
      break;
    case 502:
      errMessage = formatOutside('sys.api.error.msg.502');
      break;
    case 503:
      errMessage = formatOutside('sys.api.error.msg.503');
      break;
    case 504:
      errMessage = formatOutside('sys.api.error.msg.504');
      break;
    case 505:
      errMessage = formatOutside('sys.api.error.msg.505');
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: formatOutside('sys.api.error.tip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
