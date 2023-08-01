import { SorterResult } from "antd/es/table/interface";

export const DEFAULT_COMPONENT_SETTING: ComponentSetting = {
    table: {
        fetchSetting: {
          pageField: 'page',
          sizeField: 'pageSize',
          listField: 'items',
          totalField: 'total',
        },
        pageSizeOptions: ['10', '50', '80', '100'],
        pageSize: 10,
        size: 'middle',
        sortFn: (sortInfo: SorterResult<any>) => (sortInfo.field && sortInfo.order) ? {
          field: sortInfo.field,
          order: sortInfo.order
        } : {},
        filterFn: (data: Recordable) => data
    }
}