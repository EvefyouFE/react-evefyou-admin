import { useFullscreen } from "ahooks";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Tabs, TabsProps } from "antd";
import React, { FC, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router";
import { DndContextTabBar } from "./components/DndContextTabBar";
import './index.less';
import { TabBarExtraContent } from "./components/TabBarExtraContent";
import { CommonContainer, CommonContainerInstance } from "../../CommonContainer";
import { genUUID } from "@/utils/generate";
import { useAppRecoilValue } from "@/stores/app";
import { Icon } from "@/components/Icon";
import { useDesign } from "@/hooks/design";
import { useLayoutSettingValue } from "@/hooks/setting";
import { useTabs } from "@/hooks/components/tabs";
import { useTabItemsState } from "./hooks/useTabItemsState";

// eslint-disable-next-line react-refresh/only-export-components
export function translate2MenuItems(tabsMenuList: TabsMenuItem[]) {
    return tabsMenuList?.map((m, index) => ({
        key: index,
        label: <FormattedMessage id={m.title} />,
        icon: <Icon icon={m.icon} />
    }))
}

const ChildrenWraper = React.forwardRef(({ children }: {
    children: React.ReactNode,
}, ref: React.ForwardedRef<CommonContainerInstance>) => (
    <CommonContainer ref={ref}>
        {children}
    </CommonContainer>
))
ChildrenWraper.displayName = 'ChildrenWraper'

export const TabContainer: FC<PropsWithChildren> = ({ children }) => {
    const [{ activeKeyState }, {
        itemsState: {
            set: setItems,
        },
        addOrUpdateAndActive,
        active,
        removeByKey,
        clear,
        removeLeft,
        removeOther,
        removeRight,
        getViewTabItems,
    }] = useTabItemsState();
    const itemsState = getViewTabItems()
    const newTabIndex = useRef(0);
    const location = useLocation();
    const [, { getTabContainerSetting }] = useAppRecoilValue()
    const { indexRedirectPath, tabsMenuList } = getTabContainerSetting()
    const [className, setClassName] = useState('')
    const { getTabItem } = useTabs();
    const { pageTabsNavHeightWithUnit } = useLayoutSettingValue()
    const { prefixCls } = useDesign('tab-container')
    const containerRef = useRef<CommonContainerInstance>(null)
    const [, { toggleFullscreen }] = useFullscreen(getContainerElement)
    const navigate = useNavigate()
    const onEdit = useCallback((
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            const newItem = { label: 'New Tab', children: 'Content of new Tab', key: `newTab${newTabIndex.current += 1}` }
            addOrUpdateAndActive(newItem);
        } else {
            removeByKey(targetKey as string);
        }
    }, [addOrUpdateAndActive, removeByKey])
    const [childrenKeyState, setChildrenKeyState] = useState('')
    const onChange = useCallback((activeKey: string) => {
        active(activeKey)
        activeKey
            && !activeKey.startsWith('newTab')
            && activeKey !== location.pathname
            && navigate(activeKey)
    }, [active, location.pathname, navigate])

    const wrapChildren = useMemo(() => (
        <ChildrenWraper ref={containerRef} key={childrenKeyState}>
            {children}
        </ChildrenWraper>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [childrenKeyState])
    useEffect(() => {
        const path = location.pathname === '/' ? indexRedirectPath : location.pathname;
        const locale = 'menu'.concat(path.replaceAll('/', '.'))
        const pathItem = { ...getTabItem(path, locale, '', wrapChildren), forceRender: true }
        addOrUpdateAndActive(pathItem)
    }, [location.pathname, indexRedirectPath, getTabItem, wrapChildren, addOrUpdateAndActive])

    const useRenderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
        const handleOnDragEnd = useCallback(({ active: activeItem, over }: DragEndEvent) => {
            if (activeItem.id !== over?.id) {
                setItems((prev) => {
                    const activeIndex = prev.findIndex((i) => i.key === activeItem.id);
                    const overIndex = prev.findIndex((i) => i.key === over?.id);
                    return arrayMove(prev, activeIndex, overIndex);
                });
            }
        }, [])
        const handleOnActiveBarTransform = useCallback((cls: string) => {
            setClassName(cls)
        }, [])
        return (
            <DndContextTabBar
                items={itemsState}
                DefaultTabBar={DefaultTabBar}
                handleOnDragEnd={handleOnDragEnd}
                handleOnActiveBarTransform={handleOnActiveBarTransform}
                {...props}
            />
        )
    }
    const tabBarExtraContentItems = useMemo(() => translate2MenuItems(tabsMenuList), [tabsMenuList])
    const tabBarExtraContentPropsValue = {
        items: tabBarExtraContentItems,
        onFullScreen,
        onRefresh,
        onCloseAllTabs,
        onCloseCurrentTab,
        onCloseLeftTabs,
        onCloseOtherTabs,
        onCloseRightTabs,
    }
    const tabBarExtraContent = (
        <TabBarExtraContent {...tabBarExtraContentPropsValue} />
    )

    function onFullScreen() {
        toggleFullscreen()
    }
    function onRefresh() {
        setChildrenKeyState(genUUID)
    }
    function onCloseAllTabs() {
        clear()
    }
    function onCloseCurrentTab() {
        activeKeyState && removeByKey(activeKeyState)
    }
    function onCloseLeftTabs() {
        activeKeyState && removeLeft(activeKeyState)
    }
    function onCloseOtherTabs() {
        activeKeyState && removeOther(activeKeyState)
    }
    function onCloseRightTabs() {
        activeKeyState && removeRight(activeKeyState)
    }
    function getContainerElement() {
        return containerRef.current?.getElement()
    }
    return (
        <Tabs
            tabBarStyle={{
                height: pageTabsNavHeightWithUnit
            }}
            className={`${prefixCls} ${className} h-full`}
            size="small"
            onChange={onChange}
            activeKey={activeKeyState as string}
            type="editable-card"
            onEdit={onEdit}
            items={itemsState}
            renderTabBar={useRenderTabBar}
            tabBarExtraContent={tabBarExtraContent}
            destroyInactiveTabPane
            animated={{
                inkBar: true,
                tabPane: true
            }}
        />
    )
}
