import { is } from "ramda";
import { defineRecoilValue } from "react-evefyou-hooks";
import { atom } from "recoil";
import { AxiosError } from "axios";
import { DEFAULT_PROJECT_CONFIG } from "@/config/app/project"
import { ErrorTypeEnum } from "@/enums";
import { ErrorLogInfo } from "@/types/store";
import { formatToDateTime } from "@/utils/dateUtil";

export interface ErrorLogState {
    errorLogInfoList: Nullable<ErrorLogInfo[]>;
    errorLogListCount: number;
}

const DEFAULT_ERROR_LOG_STATE: ErrorLogState = {
    errorLogInfoList: null,
    errorLogListCount: 0,
}

export const errorLogAtom = atom({
    key: 'errorLogAtom',
    default: DEFAULT_ERROR_LOG_STATE
})

export const useErrorLogRecoilState = defineRecoilValue({
    name: 'errorLogState',
    state: DEFAULT_ERROR_LOG_STATE,
    getters: {
        getErrorLogInfoList(state): ErrorLogInfo[] {
            return state.errorLogInfoList || [];
        },
        getErrorLogListCount(state): number {
            return state.errorLogListCount;
        },
    },
    setters: {
        setErrorLogListCount(errorLogListCount: number | ((c: number) => number)): void {
            if (is(Function, errorLogListCount)) {
                this.set(log => {
                    const count = errorLogListCount(log.errorLogListCount)
                    return {
                        ...log,
                        errorLogListCount: count
                    }
                })
            }
            this.setProps({ errorLogListCount: errorLogListCount as number })
        },
        setErrorLogInfoList(errorLogInfoList: ErrorLogInfo[]): void {
            this.setProps({ errorLogInfoList })
        },
    },
    actions: {
        addErrorLogInfo(info: ErrorLogInfo) {
            const item = {
                ...info,
                time: formatToDateTime(new Date()),
            }
            this.setErrorLogInfoList([item, ...(this.errorLogState.errorLogInfoList || [])])
            this.setErrorLogListCount(c => c + 1)
        },

        /**
         * Triggered after ajax request error
         * @param error
         * @returns
         */
        addAjaxErrorInfo(error: AxiosError) {
            const { useErrorHandle } = DEFAULT_PROJECT_CONFIG;
            if (!useErrorHandle) {
                return;
            }
            const errInfo: ErrorLogInfo = {
                message: error.message,
                type: ErrorTypeEnum.AJAX,
            };
            if (error.response) {
                const {
                    config: { url = '', data: params = '', method = 'get', headers = {} } = {},
                    data = {},
                } = error.response;
                errInfo.url = url;
                errInfo.name = 'Ajax Error!';
                errInfo.file = '-';
                errInfo.stack = JSON.stringify(data);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                errInfo.detail = JSON.stringify({ params, method, headers });
            }
            this.addErrorLogInfo(errInfo);
        },
    },
}, errorLogAtom)