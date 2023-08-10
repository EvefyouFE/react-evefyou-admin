/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:31
 * @FilePath: \react-evefyou-admin\src\components\Containers\TableContainer\src\typing.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import { BaseInstance } from "react-evefyou-hooks";
import { BasicFormInstance } from "@/components/Form";
import { BasicTableInstance } from "@/components/Table/src/types/tableHook";
import { TableContainerProps } from "./props";

export interface TableContainerInstance<T = any> extends BaseInstance<TableContainerProps<T>> {
  formInstance: Partial<BasicFormInstance<any>>;
  tableInstance: Partial<BasicTableInstance<any>>;
  getElement: () => HTMLDivElement | null;
}

export interface UseTableLayoutHooksMethods {
  instance: TableContainerInstance;
  tableInstance: Partial<BasicTableInstance>;
}
export interface UseTableLayoutMethods {
  resetTableHeight: () => void;
}
export type UseTableLayoutReturnType = UseTableLayoutMethods