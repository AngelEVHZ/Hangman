import React from "react";
import "../FloatingActionButton/FloatingActionButtonStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../Context/LanguageProvider";


const FloatingActionButtonMenu: React.FC<any> = () => {
    const { lang } = useLanguage();
    return (
        <div className="fab-container">
            <div className="fab fab-icon-holder2">
                <i className="far fa-question-circle"><FontAwesomeIcon className="icon m-0" icon={faCog} /></i>
            </div>

            {/*<ul className="fab-options">
                <li onClick={() => props.toggleShowAboutModal(true)}>
                    <span className="fab-label">{lang.floatingActionButton.contact}</span>
                    <div className="fab-icon-holder">
                        <i className="fas fa-file-alt"><FontAwesomeIcon className="icon m-0" icon={faIdCard} /></i>
                    </div>
                </li>
                <li onClick={() => props.toggleShowUsModal(true)}>
                    <span className="fab-label">{lang.floatingActionButton.about_us}</span>
                    <div className="fab-icon-holder">
                        <i className="fas fa-video"><FontAwesomeIcon className="icon m-0" icon={faInfoCircle} /></i>
                    </div>
                </li>
                <li onClick={() => props.toggleShowCreditsModal(true)}>
                    <span className="fab-label">{lang.floatingActionButton.credits}</span>
                    <div className="fab-icon-holder">
                        <i className="fas fa-comments"><FontAwesomeIcon className="icon m-0" icon={faCopyright} /></i>
                    </div>
                </li>
            </ul>*/}
        </div>
    );
};
export default FloatingActionButtonMenu;