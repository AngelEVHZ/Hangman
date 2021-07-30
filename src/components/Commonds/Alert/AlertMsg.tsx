import React from "react";
import { Alert } from "react-bootstrap";
import { useSettings } from "../../../context/SettingsProvider";
import "./AlertStyle.css"
const AlertMsg: React.FC<any> = () => {
    const settings = useSettings();
    const {alert} = settings.state;

    return (
        <>
            {alert.show &&
                <div className="fade-in-down-top">
                    <Alert variant={alert.type}>
                        {alert.msg}
                    </Alert>
                </div>
            }
        </>
    );
};
export default AlertMsg;