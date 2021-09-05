import React from "react";
import "./Modals.css";
import { useLanguage } from "../../../Context/LanguageProvider";

interface AboutModalProps {
    show: boolean;
    toggleShowAboutModal: (value: boolean) => void;
}

const AboutModal: React.FC<AboutModalProps> = (props: AboutModalProps) => {
    const { lang } = useLanguage();
    const isActive = props.show ? "is-active" : "";

    return (
        <div className={`modal ${isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className="message is-danger">
                    <div className="message-header">
                        <p>{lang.aboutModal.title}</p>
                        <button className="delete" aria-label="delete" onClick={() => props.toggleShowAboutModal(false)}></button>
                    </div>
                    <div className="message-body message-letter">
                        <em>{lang.aboutModal.message_body1}</em><br></br><br></br>
                        <strong><em>{lang.aboutModal.message_body2}</em></strong><br></br><br></br>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowAboutModal(false)}></button>
        </div>
    );
};
export default AboutModal;