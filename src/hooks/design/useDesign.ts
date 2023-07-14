import { useAppContext } from "@/components/Application";

export function useDesign(scope: string) {
  const values = useAppContext();

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}

export default useDesign;