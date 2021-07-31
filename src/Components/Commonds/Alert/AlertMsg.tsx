import React from "react";
import { Alert } from "react-bootstrap";
import { useUtils } from "../../../Context/UtilsProvider";
import "./AlertStyle.css"
const AlertMsg: React.FC<any> = () => {
    const utils = useUtils();
    const {alert} = utils.state;

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