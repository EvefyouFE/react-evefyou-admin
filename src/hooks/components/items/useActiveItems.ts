import { omit } from "ramda";
import { Item, useSelectItems } from "./useSelectItems";


export interface UseActiveItemsReturnMethod<K extends React.Key, T extends Item<K>> {
    getActiveItem: () => T;
    getActiveKey: () => K;
    setActiveKey: (key: K) => void;
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
    changeActiveKey: (newActiveKey: K) => void;
    addItemAndActive: (newItem: T) => void;
    updateItemAndActive: (newItem: T) => void;
    removeItemAndActive: (targetKey: K) => void;
    removeAll: () => void;
    removeLeft: (key: K) => void;
    removeRight: (key: K) => void;
    removeOther: (key: K) => void;
}
export type UseActiveItemsReturnType<K extends React.Key, T extends Item<K>> = [
    K,
    T[],
    UseActiveItemsReturnMethod<K, T>
]

export function useActiveItems<T extends Item<K>, K extends React.Key = string>(initialActiveKey?: K, initialItems?: T[])
: UseActiveItemsReturnType<K, T> {
    const [selectedKeys, items, { 
        getSelectedItems, 
        setItems, 
        changeSelectedKeys, 
        addItem, 
        updateItem, 
        removeItem,
        ...rest
    }] = useSelectItems(initialActiveKey ? [initialActiveKey] : undefined, initialItems)

    function getActiveItem() {
        return getSelectedItems()[0]
    }
    function getActiveKey() {
        return selectedKeys[0]
    }
    function setActiveKey(key: K) {
        changeSelectedKeys([key])
    }
    function changeActiveKey(newActiveKey: K) {
        setActiveKey(newActiveKey);
    }
    function addItemAndActive(newItem: T) {
        addItem(newItem)
        changeSelectedKeys([newItem.key])
    };
    function updateItemAndActive(newItem: T) {
        updateItem(newItem)
    }

    function removeItemAndActive(targetKey: K) {
        const newPanes = removeItem(targetKey);

        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        let activeKey = getActiveKey();
        if (newPanes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = newPanes[lastIndex].key;
            } else {
                activeKey = newPanes[0].key;
            }
        }
        activeKey && setActiveKey(activeKey);
    }

    return [
        getActiveKey(),
        items,
        {
            getActiveItem,
            getActiveKey,
            setActiveKey,
            setItems,
            changeActiveKey,
            addItemAndActive,
            updateItemAndActive,
            removeItemAndActive,
            ...omit(['setSelectedKeys', 'addItemAndSelect'], rest)
        }
    ]
}
