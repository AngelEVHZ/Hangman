import React from "react";
import { useUtils } from "../../../Context/UtilsProvider";
import "./AlertStyle.css"
const AlertMsg: React.FC<any> = () => {
    const utils = useUtils();
    const { alert } = utils.state;

    const close = () => {
        utils.handle.closeAlert();
    }

    return (
        <>
            {alert.show &&
                <div className="fade-in-down-top">
                    <div className={`notification ${alert.type}`}>
                        <button className="delete" onClick={close}></button>
                        <strong>{alert.msg}</strong>
                    </div>
                </div>
            }


        </>
    );
};
export default AlertMsg;