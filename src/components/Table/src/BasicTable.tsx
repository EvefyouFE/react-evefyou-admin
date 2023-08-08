import { TablePaginationConfig } from 'antd';
import Table, { ColumnType, TableProps } from 'antd/es/table';
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/es/table/interface';
import classNames from 'classnames';
import { is, omit } from 'ramda';
import React, {
  ReactElement,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useColumns,
  useDataSource,
  usePagination,
  useRowSelection,
  useTableScroll,
} from './hooks';
import { BasicTableProps } from './props';
import { useRenders } from './renders';
import { SearchState, TableChangeParams } from './types/table';
import { TableContextValue, BasicTableInstance } from './types/tableHook';
import './index.less';
import { useTableProps } from './hooks/useTableProps';
import { useDesign } from '@/hooks/design';
import { TableContext } from './context';
import { deepCompareObj } from '@/utils/object';

export const BasicTable = React.memo(
  React.forwardRef(
    <T extends Recordable = any>(
      props: BasicTableProps<T>,
      ref: React.ForwardedRef<BasicTableInstance<T>>,
    ) => {
      const tableRef = useRef<HTMLDivElement>(null);
      const [propsState, propsMethods] = useTableProps(props);
      const [paginationState, paginationMethods] = usePagination(propsState);
      const [, rowSelectionMethods] = useRowSelection(propsState);
      const [dataSourceState, dataSourceMethods] = useDataSource({
        props: propsState,
        getRowKey: rowSelectionMethods.getRowKey,
      });
      const [, columnsMethods] = useColumns(propsState);
      const [scrollMemo] = useTableScroll(propsState, {
        tableRef,
        getRowSelection: rowSelectionMethods.getRowSelection,
        getViewColumns: columnsMethods.getViewColumns,
      });
      const [searchState] = useState<SearchState>({
        sortInfo: {},
        filterInfo: {},
      });

      const context: TableContextValue = useMemo(
        () => ({
          getElement: () => tableRef.current,
          setSize: propsMethods.setSize,
          setShowIndexColumn: propsMethods.setShowIndexColumn,
          setRowSelection: propsMethods.setRowSelection,
          getRowSelection: rowSelectionMethods.getRowSelection,
          getDefaultRowSelection: rowSelectionMethods.getDefaultRowSelection,
          hideRowSelection: rowSelectionMethods.hideRowSelection,
          rowSelectionIsHidden: rowSelectionMethods.rowSelectionIsHidden,
          getColumns: columnsMethods.getColumns,
          setColumnsWithCache: columnsMethods.setColumnsWithCache,
          getShowIndexColumn: columnsMethods.getShowIndexColumn,
          getCacheColumns: columnsMethods.getCacheColumns,
        }),
        [propsMethods, rowSelectionMethods, columnsMethods],
      );

      const instance: BasicTableInstance = useMemo(
        () => ({
          init: propsMethods.init,
          getElement: () => tableRef.current,
          setHeight: propsMethods.setHeight,
          getDataSource: dataSourceMethods.getDataSource,
          getPagination: paginationMethods.getPagination,
        }),
        [propsMethods, dataSourceMethods, paginationMethods],
      );
      useImperativeHandle(ref, () => instance, [instance]);

      const { tableHeader: renderTableHeader } = useRenders({
        ...propsState,
        tableRef,
        dataSource: dataSourceState,
      });

      const { prefixCls } = useDesign('basic-table');
      const tableClsName = classNames(prefixCls, 'bg-white p-4');
      const { tableSetting, caption, title, searchConfig, ...restPropsState } =
        propsState;
      const renderCaption = !title ? renderTableHeader : caption;
      const propsValue: TableProps<T> = {
        ...omit(['children', 'searchProps'], restPropsState),
        scroll: scrollMemo,
        onHeaderRow: handleHeaderRow,
        caption: renderCaption,
        title: !renderCaption ? () => renderTableHeader : title,
        columns: columnsMethods.getViewColumns(),
        rowSelection: rowSelectionMethods.getRowSelection(),
        rowKey: rowSelectionMethods.getRowKey,
        dataSource: dataSourceState,
        pagination: paginationState,
        onChange: handleTableChange,
        className: tableClsName,
      };

      function handleHeaderRow(
        data: readonly ColumnType<any>[],
        index?: number,
      ) {
        console.debug(data, index);
        return {
          style: {
            height: props.headerRowHeight,
          },
        };
      }
      function handleTableChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<T> | SorterResult<T>[],
        { currentDataSource, action }: TableCurrentDataSource<any>,
      ) {
        console.debug(currentDataSource, action);
        // clearSelectOnChange &&
        paginationMethods.setPagination(pagination);

        const params: TableChangeParams = {};

        if (sorter && is(Function, props.sortFn)) {
          if (is(Array, sorter)) {
            const sortInfo = sorter.map((st) => props.sortFn?.(st));
            searchState.sortInfo = sortInfo;
            params.sortInfo = sortInfo;
          } else {
            const sortInfo = props.sortFn(sorter);
            searchState.sortInfo = sortInfo;
            params.sortInfo = sortInfo;
          }
        }

        if (filters && is(Function, props.filterFn)) {
          const filterInfo = props.filterFn(filters);
          searchState.filterInfo = filterInfo;
          params.filterInfo = filterInfo;
        }

        props.onTableChange?.(params);
      }
      return (
        <TableContext.Provider value={context}>
          <Table<T> ref={tableRef} {...propsValue} />
        </TableContext.Provider>
      );
    },
  ),
  deepCompareObj,
) as <T = any>(
  p: BasicTableProps<T> & { ref?: Ref<BasicTableInstance> },
) => ReactElement;
