import { DEFAULT_COMPONENT_SETTING } from "@/config";
import { TableSetting } from "./types";

const { table } = DEFAULT_COMPONENT_SETTING;

const {
  pageSizeOptions,
  pageSize,
  fetchSetting,
  size,
  sortFn,
  filterFn,
} = table;

export const ROW_KEYS = ['key', 'id'];

// Optional display number per page;
export const PAGE_SIZE_OPTIONS = pageSizeOptions;

// Number of items displayed per page
export const PAGE_SIZE = pageSize;

// Common interface field settings
export const FETCH_SETTING = fetchSetting;

// Default Size
export const DEFAULT_SIZE = size;

// Configure general sort function
export const DEFAULT_SORT_FN = sortFn;

export const DEFAULT_FILTER_FN = filterFn;

//  Default layout of table cells
export const DEFAULT_ALIGN = 'center';

export const DEFAULT_TABLE_SETTING: TableSetting = {
  redo: true,
  size: true,
  setting: true,
  fullScreen: true,
}

export const DEFAULT_TABLE_INNER_PROPS: any = {
  size: 'middle',
  tableSetting: false,
}