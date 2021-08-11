import React from "react";
import "./FloatingActionButtonStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faIdCard, faInfoCircle, faPhotoVideo, faCreditCard } from "@fortawesome/free-solid-svg-icons";

const FloatingActionButton: React.FC<any> = () => {
    return (
        <div className="fab-container">
            <div className="fab fab-icon-holder">
                <i className="far fa-question-circle"><FontAwesomeIcon className="icon m-0" icon={faQuestionCircle} /></i>
            </div>

            <ul className="fab-options">
                <li>
                    <span className="fab-label">Contacto</span>
                    <div className="fab-icon-holder">
                        <i className="fas fa-file-alt"><FontAwesomeIcon className="icon m-0" icon={faIdCard} /></i>
                    </div>
                </li>
                <li>
                    <span className="fab-label">Acerca de Nosotros</span>
                    <div className="fab-icon-holder">
                        <i className="fas fa-video"><FontAwesomeIcon className="icon m-0" icon={faInfoCircle} /></i>
                    </div>
                </li>
                <li>
                    <span className="fab-label">Videos Tutoriales</span>
                    <div className="fab-icon-holder">
                        <i className="fas fa-comments"><FontAwesomeIcon className="icon m-0" icon={faPhotoVideo} /></i>
                    </div>
                </li>
                <li>
                    <span className="fab-label">Donaciones</span>
                    <div className="fab-icon-holder">
                        <i className="fas fa-comment-alt"><FontAwesomeIcon className="icon m-0" icon={faCreditCard} /></i>
                    </div>
                </li>
            </ul>
        </div>
    );
};
export default FloatingActionButton;