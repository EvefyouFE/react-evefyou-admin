import { includes } from "ramda";
import React, { useState } from "react";

export type Item<K extends React.Key = string> = Recordable & {
    key: K,
}

export interface UseSelectItemsReturnMethod<K extends React.Key, T extends Item<K>> {
    setSelectedKeys: React.Dispatch<React.SetStateAction<K[]>>;
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
    changeSelectedKeys: (newActiveKey: K[]) => void;
    addItem: (newItem: T) => void;
    addItemAndSelect: (newItem: T) => void;
    updateItem: (newItem: T) => void;
    removeItem: (targetKey: K) => T[];
    getSelectedItems: () => T[];
    removeAll: () => void;
    removeLeft: (key: K) => void;
    removeRight: (key: K) => void;
    removeOther: (key: K) => void;
}
export type UseSelectItemsReturnType<K extends React.Key, T extends Item<K>> = [
    K[],
    T[],
    UseSelectItemsReturnMethod<K, T>
]

export function useSelectItems<T extends Item<K>, K extends React.Key = string>(initialSelectedKeys?: K[], initialItems?: T[]): UseSelectItemsReturnType<K, T> {
    const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys || []);
    const [items, setItems] = useState(initialItems || [])

    function getSelectedItems() {
        return items.filter(item => includes(item.key, selectedKeys))
    }
    function changeSelectedKeys(newSelectKeys: K[]) {
        setSelectedKeys(newSelectKeys);
    }
    function addItem(newItem: T) {
        const newPanes = items.filter((item) => item.key !== newItem.key);
        if (newPanes.length === items.length) {
            newPanes.push(newItem);
            setItems(newPanes);
        }
    }
    function addItemAndSelect(newItem: T) {
        addItem(newItem)
        const newKeys = selectedKeys.filter((key) => key !== newItem.key);
        if (newKeys.length === selectedKeys.length) {
            newKeys.push(newItem.key)
            setSelectedKeys(newKeys)
        }
    }
    function updateItem(newItem: T) {
        const newPanes = items.map(item => item.key === newItem.key ? newItem : item)
        setItems(newPanes)
        setSelectedKeys([...selectedKeys])
    }

    function removeItem(targetKey: K) {
        const newPanes = items.filter((item) => item.key !== targetKey);
        setItems(newPanes);
        const newKeys = selectedKeys.filter((key) => key !== targetKey);
        if (newKeys.length !== selectedKeys.length) {
            setSelectedKeys(newKeys)
        }
        return newPanes;
    }

    function removeAll() {
        setItems([])
        setSelectedKeys([])
    }
    function removeLeft(key: K) {
        const idx = items.findIndex(item => item.key === key)
        idx > 0 && setItems(items.slice(idx))
        const idx2 = selectedKeys.findIndex(k => k === key)
        idx2 > 0 && setSelectedKeys(selectedKeys.slice(idx2))
    }
    function removeRight(key: K) {
        const idx = items.findIndex(item => item.key === key)
        idx !== -1 && idx !== items.length - 1 && setItems(items.slice(0, idx + 1))
        const idx2 = selectedKeys.findIndex(k => k === key)
        idx2 !== -1 && idx2 !== selectedKeys.length - 1 && setSelectedKeys(selectedKeys.slice(0, idx2 + 1))
    }
    function removeOther(key: K) {
        const item = items.find(im => im.key === key)
        if (items.length !== 1 && item) {
            setItems([item])
            setSelectedKeys([key])
        }
    }

    return [
        selectedKeys,
        items,
        {
            setSelectedKeys,
            setItems,
            changeSelectedKeys,
            addItem,
            addItemAndSelect,
            updateItem,
            removeItem,
            removeAll,
            removeLeft,
            removeOther,
            removeRight,
            getSelectedItems,
        }
    ]
}