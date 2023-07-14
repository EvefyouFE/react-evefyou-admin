import { FC, createContext, useState } from "react"
import { ModalContextDataMap, ModalContextOpenMap, ModalContextProps, ModalContextValue } from "../typing"

const DEFAULT_MODAL_CONTEXT_VALUE = {
    dataMap: {
    },
    setDataMap: (data: React.SetStateAction<ModalContextDataMap>) => {} ,
    openMap: {

    },
    setOpenMap: (data: React.SetStateAction<ModalContextOpenMap>) => {} ,
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