import { KeepAliveContext } from "@/components/KeepAlive";
import { useContext } from "react";

export function useKeepAliveSetting() {
    const context = useContext(KeepAliveContext)
    return {
        ...context
    }
}