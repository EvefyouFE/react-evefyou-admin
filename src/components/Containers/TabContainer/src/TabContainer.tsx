import { Icon } from "@/components/Icon";
import { useActiveItems, useLayoutSetting, useTabs, useDesign } from "@/hooks";
import { useTabContainerSetting } from "@/hooks/setting/useTabContainerSetting";
import { PropsWithChildrenCls } from "@/types/base";
import { TabsMenuItem } from "@/types/config";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Spin, Tabs, TabsProps } from "antd";
import React, { FC, PropsWithChildren, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router";
import { DndContextTabBar } from "./components/DndContextTabBar";
import './index.less';
import { TabBarExtraContent } from "./components/TabBarExtraContent";
import { TabItem } from "./type";
import { CommonContainer, CommonContainerInstance } from "../../CommonContainer";
import { useFullscreen, useUpdate } from "ahooks";
import { genUUID } from "@/utils";

export function translate2MenuItems(tabsMenuList: TabsMenuItem[]) {
    return tabsMenuList?.map((m, index) => ({
        key: index,
        label: <FormattedMessage id={m.title} />,
        icon: <Icon icon={m.icon} />
    }))
}

const CommonChildren = React.forwardRef(({ children }: {
    children: React.ReactNode,
}, ref: React.ForwardedRef<CommonContainerInstance>) => {
    return (
        <CommonContainer ref={ref}>
            {children}
        </CommonContainer>
    )
})

export const TabContainer: FC<PropsWithChildren> = ({ children }) => {
    const [activeKey, items, { 
        setItems, 
        addItemAndActive, 
        changeActiveKey, 
        updateItemAndActive, 
        removeItemAndActive,
        removeAll,
        removeLeft,
        removeOther,
        removeRight,
    }] = useActiveItems<TabItem>();
    const newTabIndex = useRef(0);
    const location = useLocation();
    const { indexRedirectPath, tabsMenuList } = useTabContainerSetting()
    const [className, setClassName] = useState('')
    const { getTabItem } = useTabs();
    const { pageTabsNavHeightWithUnit } = useLayoutSetting()
    const { prefixCls } = useDesign('tab-container')
    const containerRef = useRef<CommonContainerInstance>(null)
    const [, { toggleFullscreen }] = useFullscreen(getContainerElement)
    const navigate = useNavigate()
    const update = useUpdate();

    function onEdit(
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) {
        if (action === 'add') {
            const newItem = { label: 'New Tab', children: 'Content of new Tab', key: `newTab${newTabIndex.current++}` }
            addItemAndActive(newItem);
        } else {
            removeItemAndActive(targetKey as string);
        }
    }

    useEffect(() => {
        if (items.length === 1) {
            items[0].closable = false;
        } else if (items.length > 1) {
            items[0].closable = true;
        }
        activeKey && !activeKey.startsWith('newTab') && navigate(activeKey as string)
    }, [activeKey])

    useEffect(() => {
        const newItem = getCurrentItem()
        addItemAndActive(newItem)
    }, [location])

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => {
        const handleOnDragEnd = useCallback(({ active, over }: DragEndEvent) => {
            if (active.id !== over?.id) {
                setItems((prev) => {
                    const activeIndex = prev.findIndex((i) => i.key === active.id);
                    const overIndex = prev.findIndex((i) => i.key === over?.id);
                    return arrayMove(prev, activeIndex, overIndex);
                });
            }
        }, [setItems])
        const handleOnActiveBarTransform = useCallback((className: string) => {
            setClassName(className)
        }, [setClassName])
        return (
            <DndContextTabBar
                items={items}
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
        <TabBarExtraContent {...tabBarExtraContentPropsValue}/>
    )
    function onFullScreen() {
        toggleFullscreen()
    }
    function onRefresh() {
        const currentItem = getCurrentItem(true)
        updateItemAndActive(currentItem)
        update()
    }
    function onCloseAllTabs() {
        removeAll()
    }
    function onCloseCurrentTab() {
        console.log('.........')
        removeItemAndActive(activeKey)
    }
    function onCloseLeftTabs() {
        removeLeft(activeKey)
    }
    function onCloseOtherTabs() {
        removeOther(activeKey)
    }
    function onCloseRightTabs() {
        removeRight(activeKey)
    }
    function getContainerElement() {
        return containerRef.current?.getElement()
    }
    function getCurrentItem(randomKey: boolean = false) {
        const path = location.pathname === '/' ? indexRedirectPath : location.pathname;
        const locale = 'menu'.concat(path.replaceAll('/', '.'))
        const wrapChildren = (
            <CommonChildren ref={containerRef} key={randomKey? genUUID():undefined}>
                {children}
            </CommonChildren>
        )
        return {...getTabItem(path, locale, '', wrapChildren), forceRender: true}
    }
    return (
        <Tabs
            tabBarStyle={{
                height: pageTabsNavHeightWithUnit
            }}
            className={`${prefixCls} ${className} h-full`}
            size="small"
            onChange={changeActiveKey}
            activeKey={activeKey as string}
            type="editable-card"
            onEdit={onEdit}
            items={items}
            renderTabBar={renderTabBar}
            tabBarExtraContent={tabBarExtraContent}
            destroyInactiveTabPane
            animated={{
                inkBar: true,
                tabPane: true
            }}
        />
    )
}
