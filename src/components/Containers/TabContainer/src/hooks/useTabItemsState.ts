import { defineActiveItemsState } from "@/hooks/state/items";
import { TabItem } from "../typing";
import { defineUseState } from "@/hooks/state";

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
