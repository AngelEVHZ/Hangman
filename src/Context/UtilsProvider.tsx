
import React, { useContext } from "react";
import { AlertMsgProps } from "../types/CommondTypes";
import { UseUtilsState, UtilsContextInterface } from "./State/UseUtilsState";



const INITIAL_STATE: UtilsContextInterface = {
    handle: {
        setShowLoader: () => { },
        showAlert: (alert: AlertMsgProps) => {},
    },
    state: {
        showLoader: false,
        alert: {show: false, msg:"", type:""},
    }
}

const UtilsContext = React.createContext<UtilsContextInterface>(INITIAL_STATE);

export const useUtils = () => {
    return useContext(UtilsContext)
}

export const UtilsProvider: React.FC<any> = ({ children }) => {
    const props = UseUtilsState();

    return (
        <UtilsContext.Provider value={{ ...props }}>
            {children}
        </UtilsContext.Provider>
    );
}