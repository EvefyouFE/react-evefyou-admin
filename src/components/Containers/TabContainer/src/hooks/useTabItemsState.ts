/*
 * @Author: EvefyouFE
 * @Date: 2023-08-07 01:04:36
 * @FilePath: \react-evefyou-admin\src\components\Containers\TabContainer\src\hooks\useTabItemsState.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { defineActiveItemsState, defineUseState } from "react-evefyou-hooks";
import { TabItem } from "../typing";

const useActiveItemsState = defineActiveItemsState<TabItem>()

export const useTabItemsState = defineUseState({
  name: 'tabsItemsState',
  useState: () => useActiveItemsState(),
  getters: {
    getViewTabItems(state) {
      const items = state.itemsState
      if (items.length === 1) {
        items[0].closable = false;
      } else if (items.length > 1) {
        items[0].closable = true;
      }
      return items
    }
  }
})
