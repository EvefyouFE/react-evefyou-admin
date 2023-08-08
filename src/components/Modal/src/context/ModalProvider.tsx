/* eslint-disable react/jsx-no-constructed-context-values */
import { FC, createContext, useState } from "react"
import { ModalContextProps, ModalContextValue } from "../typing"

const DEFAULT_MODAL_CONTEXT_VALUE = {
    dataMap: {
    },
    setDataMap: () => { },
    openMap: {

    },
    setOpenMap: () => { },
}

export const ModalContext = createContext<ModalContextValue>(DEFAULT_MODAL_CONTEXT_VALUE)

export const ModalProvider: FC<ModalContextProps> = ({
    children
}) => {
    const [dataMap, setDataMap] = useState({})
    const [openMap, setOpenMap] = useState({})
    const value = {
        dataMap,
        setDataMap,
        openMap,
        setOpenMap,
    }
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}