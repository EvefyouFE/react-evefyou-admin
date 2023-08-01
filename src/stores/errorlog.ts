import { DEFAULT_PROJECT_CONFIG } from "@/config";
import { ErrorTypeEnum } from "@/enums";
import { defineRecoilSelectorState } from "@/hooks";
import { ErrorLogInfo } from "@/types/store";
import { formatToDateTime } from "@/utils/dateUtil";
import { is } from "ramda";
import { atom } from "recoil";

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

export const useErrorLogRecoilState = defineRecoilSelectorState({
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
        setErrorLogListCount(errorLogListCount: number|((c:number) => number)): void {
            if(is(Function, errorLogListCount)) {
                this.set(log => {
                    const count = errorLogListCount(log.errorLogListCount)
                    return {
                        ...log,
                        errorLogListCount: count
                    }
                })
            }
            this.setProps({errorLogListCount: errorLogListCount as number})
        },
        setErrorLogInfoList(errorLogInfoList: ErrorLogInfo[]): void {
            this.setProps({errorLogInfoList})
        },
    },
    actions: {
        addErrorLogInfo(info: ErrorLogInfo) {
            const item = {
                ...info,
                time: formatToDateTime(new Date()),
            };
            this.setErrorLogInfoList([item, ...(this.errorLogState.errorLogInfoList || [])])
            this.setErrorLogListCount(c => c+1)
        },

        /**
         * Triggered after ajax request error
         * @param error
         * @returns
         */
        addAjaxErrorInfo(error) {
            const { useErrorHandle } = DEFAULT_PROJECT_CONFIG;
            if (!useErrorHandle) {
                return;
            }
            const errInfo: Partial<ErrorLogInfo> = {
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
                errInfo.detail = JSON.stringify({ params, method, headers });
            }
            this.addErrorLogInfo(errInfo as ErrorLogInfo);
        },
    },
}, errorLogAtom)