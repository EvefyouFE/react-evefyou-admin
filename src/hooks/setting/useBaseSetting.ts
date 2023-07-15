import { baseSettingSelector } from "@/stores";
import { BaseSetting } from "@/types/config";
import { useRecoilState } from "recoil";

export function useBaseSetting() {
    const [baseSetting, setBaseSetting] = useRecoilState(baseSettingSelector);
    return {
        ...baseSetting as BaseSetting,
        setBaseSetting,
    }
}