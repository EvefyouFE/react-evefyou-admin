import React, { useMemo } from "react";
import { TableHeader } from "./components/TableHeader";
import { TableTitle } from "./components/TableTitle";
import { ColumnSetting } from "./components/settings/ColumnSetting";
import { FullScreenSetting } from "./components/settings/FullScreenSetting";
import { RedoSetting } from "./components/settings/RedoSetting";
import { SizeSetting } from "./components/settings/SizeSetting";
import { TableSetting } from "./components/settings/TableSetting";
import { DEFAULT_TABLE_SETTING } from "./constants";
import { UseRednersProps } from "./types/tableHook";
import { TableRenderComp } from "./types/table";
import { TableHeaderProps } from "./props";
import { genUUID } from "@/utils/generate";

// eslint-disable-next-line react-refresh/only-export-components
const RenderTableSetting = React.memo(renderTableSettingFn)

export function useRenders<T = any>(props: UseRednersProps<T>): TableRenderComp {
    const {
        tableSetting,
        onReload,
        onColumnsChange,
        tableRef,
        titleProps = {},
        title,
        caption,
        headerProps = {},
        dataSource = [],
    } = props;
    const headerPropsMemo = useMemo(() => {
        const renderTableSetting = <RenderTableSetting {...{
            tableSetting,
            onReload,
            onColumnsChange,
            tableRef,
        }} />
        if (title || caption) {
            titleProps.title ??= caption ?? title?.(dataSource)
        }
        const renderTableTitle = <TableTitle {...titleProps} />
        return {
            renderTableSetting,
            renderTableTitle,
            ...headerProps
        }
    }, [tableSetting, onReload, onColumnsChange, tableRef, title, caption, titleProps, headerProps, dataSource])

    const tableHeader = renderHeaderFn(headerPropsMemo)
    return {
        tableHeader,
    }
}

function renderTableSettingFn({
    tableSetting = DEFAULT_TABLE_SETTING,
    onReload,
    onColumnsChange,
    tableRef,
}: UseRednersProps) {
    if (!tableSetting) return null;
    const {
        redo,
        size,
        setting,
        fullScreen
    } = tableSetting
    const items = [
        redo && (
            <RedoSetting redo={onReload} getPopupContainer={getPopupContainer} key={genUUID()} />
        ),
        size && (
            <SizeSetting getPopupContainer={getPopupContainer} key={genUUID()} />
        ),
        setting && (
            <ColumnSetting onColumnsChange={onColumnsChange} getPopupContainer={getPopupContainer} key={genUUID()} />
        ),
        fullScreen && (
            <FullScreenSetting getPopupContainer={getPopupContainer} key={genUUID()} />
        ),
    ]
    function getPopupContainer() {
        return tableRef?.current ? tableRef.current : document.body;
    }
    return (
        <TableSetting items={items} />
    )
}

function renderHeaderFn(headerProps: TableHeaderProps) {
    const {
        renderHeaderTop,
        renderTableSetting,
        renderTableTitle,
        renderToolbar
    } = headerProps
    if (!renderHeaderTop
        && !renderTableSetting
        && !renderTableTitle
        && !renderToolbar) return null;
    return (
        <TableHeader {...headerProps} />
    )
}