import React from "react";
import { useUtils } from "../../../Context/UtilsProvider";
import "./AlertStyle.css"
const AlertMsg: React.FC<any> = () => {
    const utils = useUtils();
    const { alert } = utils.state;

    return (
        <>
            {alert.show &&
                <div className="fade-in-down-top">
                    <article className={`message ${alert.type}`}>
                        <div className="message-body">
                            <strong>{alert.msg}</strong>
                        </div>
                    </article>
                </div>
            }
        </>
    );
};
export default AlertMsg;