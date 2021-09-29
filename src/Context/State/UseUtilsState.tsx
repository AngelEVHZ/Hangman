import { useEffect, useState } from "react";
import { TimesEnum } from "../../Constant/Times";
import { AlertMsgProps, AlertTypeEnum, IddleProps } from "../../types/CommondTypes";

export interface UtilsContextInterface {
    handle: {
        closeAlert:() => void;
        setShowLoader: (value: boolean) => void;
        showAlert: (alert: AlertMsgProps) => void;
        onAction: () => void;
        onActive: () => void;
        onIdle: () => void;
        resetIddle: () => void;
        log: (tag: string, obj?: object) => void;
        setShowHeader: (value: boolean) => void;
    },
    state: {
        showLoader: boolean;
        alert: AlertMsgProps;
        iddleAction: IddleProps;
        showHeader: boolean;
    }
}

export const UseUtilsState = (): UtilsContextInterface => {
    const isDev = process.env.REACT_APP_DEV === "DEV";
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [customAlert, setAlert] = useState<AlertMsgProps>({ type: AlertTypeEnum.NONE, msg: "", show: false })
    const [alertTimeOut, setAlertTimeOut] = useState<any>(null)
    const [iddleAction, setIddleAction] = useState<IddleProps>({ activate: false, path: "" });
    const [showHeader, setShowHeader] = useState<boolean>(false);

    const showAlert = (alert: AlertMsgProps) => {
        if (alertTimeOut) clearTimeout(alertTimeOut);
        setAlert(alert);
        const time = setTimeout(() => {
            setAlert({ show: false, msg: "", type: AlertTypeEnum.NONE });
        }, TimesEnum.ALERT);
        setAlertTimeOut(time);
    }
    const closeAlert = () => {
        setAlert({ show: false, msg: "", type: AlertTypeEnum.NONE });
    }

    const log = (tag: string, obj?: object) => {
        if (isDev || true) console.log(tag, obj);
    }
    const resetIddle = () => {
        setIddleAction({ activate: false, path: "" });
    };
    
    const onAction = () => {
    };

    const onActive = () => {
    };

    const onIdle = () => {
        setIddleAction({ activate: true, path: window.location.pathname });
    };

    const preventReload = (e: any) => {
        var confirmationMessage = "\o/";     
        e.returnValue = confirmationMessage;           
        return confirmationMessage; 
      };

    useEffect(() => {
        if (isDev) return;
        window.addEventListener("beforeunload", preventReload);
        return () => {
          window.removeEventListener("beforeunload", preventReload);
        };
      }, []);

    return {
        handle: {
            closeAlert,
            setShowLoader,
            showAlert,
            onAction,
            onActive,
            onIdle,
            resetIddle,
            log,
            setShowHeader,
        },
        state: {
            showHeader,
            showLoader,
            alert: customAlert,
            iddleAction,
        }
    };
}