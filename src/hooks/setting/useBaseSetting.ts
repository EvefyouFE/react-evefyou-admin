import { baseSettingSelector } from "@/stores";
import { BaseSetting } from "@/types/config";
import { useRecoilState } from "recoil";

export function useBaseeSetting() {
    const [baseSetting, setBaseSetting] = useRecoilState(baseSettingSelector);
    return {
        ...baseSetting as BaseSetting,
        setBaseSetting,
    }
}