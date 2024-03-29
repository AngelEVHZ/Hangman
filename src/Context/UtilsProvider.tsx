
import React, { useContext } from "react";
import IdleTimer from "react-idle-timer";
import { TimesEnum } from "../Constant/Times";
import { AlertMsgProps, AlertTypeEnum, IddleProps } from "../types/CommondTypes";
import { UseUtilsState, UtilsContextInterface } from "./State/UseUtilsState";



const INITIAL_STATE: UtilsContextInterface = {
    handle: {
        logOut: () => {},
        closeAlert:() => {},
        setShowLoader: () => { },
        showAlert: (alert: AlertMsgProps) => { },
        onAction: () => { },
        onActive: () => { },
        onIdle: () => { },
        resetIddle: () => { },
        log: (tag: string, obj?: object) => {},
        setShowHeader: (value: boolean) => {},
        playAudio: () => {},
    },
    state: {
        showHeader: false,
        showLoader: false,
        alert: { show: false, msg: "", type: AlertTypeEnum.NONE },
        iddleAction: { activate: false, path: "" },
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
            <IdleTimer
                element={document}
                onActive={props.handle.onActive}
                onIdle={props.handle.onIdle}
                onAction={props.handle.onAction}
                debounce={250}
                timeout={TimesEnum.IDDLE}
            />
        </UtilsContext.Provider>
    );
}