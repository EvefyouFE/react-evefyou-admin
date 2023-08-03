import { BasicFormInstance } from "@/components/Form";
import { BasicTableInstance } from "@/components/Table";
import { BaseInstance } from "@/hooks/core";
import { TableContainerProps } from "./props";

export interface TableContainerInstance<T extends Recordable = any> extends BaseInstance<TableContainerProps<T>> {
    formInstance: Partial<BasicFormInstance<any>>;
    tableInstance: Partial<BasicTableInstance<any>>;
    getElement: () => HTMLDivElement|null;
}

export interface UseTableLayoutHooksMethods {
    instance: TableContainerInstance;
    tableInstance: Partial<BasicTableInstance>;
}
export interface UseTableLayoutMethods {
  resetTableHeight: () => void;
}
export type UseTableLayoutReturnType = UseTableLayoutMethods