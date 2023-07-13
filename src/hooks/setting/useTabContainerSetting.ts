import { tabContainerSettingSelector } from "@/stores";
import { TabContainerSetting } from "@/types/config";
import { SetterOrUpdater, useRecoilState } from "recoil";

type UseTabContainerSetting = TabContainerSetting & {
    setTabContainerSettingSelector:SetterOrUpdater<Partial<TabContainerSetting>>
}
export function useTabContainerSetting(): UseTabContainerSetting {
    const [tabContainerSetting, setTabContainerSettingSelector] = useRecoilState(tabContainerSettingSelector);
    return {
        ...tabContainerSetting as TabContainerSetting,
        setTabContainerSettingSelector,
    }
}