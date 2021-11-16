import React from "react";
import "../FloatingActionButton/FloatingActionButtonStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useUtils } from "../../../Context/UtilsProvider";
import { useLanguage } from "../../../Context/LanguageProvider";


const FloatingActionButtonMenu: React.FC<any> = () => {
    const { lang } = useLanguage();
    const utils = useUtils();
    const logOut = () => {
        utils.handle.logOut();
    }

    return (
        <div className="fab-container">
            <div className="fab fab-icon-holder2">
                <i className="far fa-question-circle"><FontAwesomeIcon className="icon m-0" icon={faCog} /></i>
            </div>

            <ul className="fab-options">
                <li>
                    <span className="fab-label">{lang.floating_menu.exit}</span>
                    <div className="fab-icon-holder"  onClick={logOut}>
                        <i className="fas fa-file-alt"><FontAwesomeIcon className="icon m-0" icon={faSignOutAlt} /></i>
                    </div>
                </li>
            </ul>
        </div>
    );
};
export default FloatingActionButtonMenu;