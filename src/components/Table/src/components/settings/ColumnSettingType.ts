import { TableColumnPropsWithKey } from "../../props";
import { ColumnChangeParam } from "../../types/table";


export interface CheckListState {
  checkAll: boolean;
  checkedList: React.Key[];
  defaultCheckList: React.Key[];
}

export type PlainOption = Pick<TableColumnPropsWithKey, 'key' | 'dataIndex' | 'fixed' | 'hidden'> & {
  label: React.ReactNode;
  value: React.Key;
}
export interface ColumnSettingProps {
  getPopupContainer: (triggerNode: HTMLElement) => HTMLElement;
  onColumnsChange?: (data: ColumnChangeParam[]) => void;
}