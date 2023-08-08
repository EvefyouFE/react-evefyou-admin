import { createContext, useContext } from "react";
import { TableContextValue } from "../types/tableHook";

export const TableContext = createContext<TableContextValue | undefined>(undefined);
export const useTableContext = () => useContext(TableContext) as TableContextValue;