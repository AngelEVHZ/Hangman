
import { useEffect } from "react";
import { useState } from "react";
import { Routes } from "../../Constant/RoutesEnum";
import { AlertMsgProps, IddleProps } from "../../types/CommondTypes";

export interface UtilsContextInterface {
    handle: {
        setShowLoader: (value: boolean) => void;
        showAlert: (alert: AlertMsgProps) => void;
        onAction: () => void;
        onActive: () => void;
        onIdle: () => void;
        resetIddle: () => void;
    },
    state: {
        showLoader: boolean;
        alert: AlertMsgProps;
        iddleAction: IddleProps;
    }
}

export const UseUtilsState = (): UtilsContextInterface => {
    const isDev = process.env.REACT_APP_DEV === "DEV";
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertMsgProps>({ type: "", msg: "", show: false })
    const [alertTimeOut, setAlertTimeOut] = useState<any>(null)
    const [iddleAction, setIddleAction] = useState<IddleProps>({ activate: false, path: "" });

    const showAlert = (alert: AlertMsgProps) => {
        if (alertTimeOut) clearTimeout(alertTimeOut);
        setAlert(alert);
        const time = setTimeout(() => {
            setAlert({ show: false, msg: "", type: "" });
        }, 1500);
        setAlertTimeOut(time);
    }
    const resetIddle = () => {
        setIddleAction({ activate: false, path: "" });
    };

    const onAction = () => {
    };

    const onActive = () => {
    };

    const onIdle = () => {
        console.log("user is idle", window.location.pathname);
        if (!isDev) setIddleAction({ activate: true, path: window.location.pathname });
    };

    return {
        handle: {
            setShowLoader,
            showAlert,
            onAction,
            onActive,
            onIdle,
            resetIddle
        },
        state: {
            showLoader,
            alert,
            iddleAction,
        }
    };
}