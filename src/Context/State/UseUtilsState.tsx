
import { useState } from "react";
import { AlertMsgProps } from "../../types/CommondTypes";

export interface UtilsContextInterface {
    handle: {
        setShowLoader: (value: boolean) => void;
        showAlert: (alert: AlertMsgProps) => void;
    },
    state: {
        showLoader: boolean;
        alert: AlertMsgProps;
    }
}

export const UseUtilsState = (): UtilsContextInterface => {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertMsgProps>({ type: "", msg: "", show: false })
    const [alertTimeOut, setAlertTimeOut] = useState<any>(null)


    const showAlert = (alert: AlertMsgProps) => {
        if (alertTimeOut) clearTimeout(alertTimeOut);
        setAlert(alert);
        const time = setTimeout(() => {
            setAlert({ show: false, msg: "", type: "" });
        }, 1500);
        setAlertTimeOut(time);
    }


    return {
        handle: {
            setShowLoader,
            showAlert,
        },
        state: {
            showLoader,
            alert
        }
    };
}