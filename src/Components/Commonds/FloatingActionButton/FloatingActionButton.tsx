import React from "react";
import "./FloatingActionButtonStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faIdCard, faInfoCircle, faPhotoVideo, faCopyright } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../Context/LanguageProvider";

interface FloatingButtonProps {
    toggleShowAboutModal: (value: boolean) => void;
    toggleShowUsModal: (value: boolean) => void;
    toggleShowCreditsModal: (value: boolean) => void;
}

const FloatingActionButton: React.FC<FloatingButtonProps> = (props: FloatingButtonProps) => {
    const { lang } = useLanguage();
    return (
        <div className="fab-container">
            <div className="fab fab-icon-holder">
                <i className="far fa-question-circle"><FontAwesomeIcon className="icon m-0" icon={faQuestionCircle} /></i>
            </div>

            <ul className="fab-options">
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
            </ul>
        </div>
    );
};
export default FloatingActionButton;