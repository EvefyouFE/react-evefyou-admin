import { useContext } from "react";
import { KeepAliveContext } from "@/components/KeepAlive";

export function useKeepAliveSetting() {
    const context = useContext(KeepAliveContext)
    return {
        ...context
    }
}