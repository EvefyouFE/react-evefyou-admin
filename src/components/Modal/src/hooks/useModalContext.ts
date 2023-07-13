import { useContext } from "react";
import { ModalContext } from "../context";

export function useModalContext() {
    const context = useContext(ModalContext);
    return context;
}