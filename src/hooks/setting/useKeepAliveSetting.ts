import { keepAliveSettingSelector } from "@/stores";
import { useRecoilState } from "recoil";

export function useKeepAliveSetting() {
    const [keepAliveSetting, setKeepAliveSetting] = useRecoilState(keepAliveSettingSelector);
    return {
        ...keepAliveSetting,
        setKeepAliveSetting,
    }
}