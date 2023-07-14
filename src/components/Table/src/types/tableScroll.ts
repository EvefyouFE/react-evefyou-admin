import { BasicTableProps } from "../props";
import { TableHookMethods } from "./table";

export interface UseTableScrollHooksMethods extends Pick<TableHookMethods,
  'getRowSelection' | 'getViewColumns'> {
  tableRef: React.RefObject<HTMLDivElement>;
}
export interface UseTableScrollMethods {
  canTableResize: () => boolean;
}

export type UseTableScrollReturnType = [BasicTableProps['scroll'], UseTableScrollMethods]