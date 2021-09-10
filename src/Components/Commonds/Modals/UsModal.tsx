import React from "react";
import "./Modals.css";
import { useLanguage } from "../../../Context/LanguageProvider";

interface UsModalProps {
    show: boolean;
    toggleShowUsModal: (value: boolean) => void;
}

const UsModal: React.FC<UsModalProps> = (props: UsModalProps) => {
    const { lang } = useLanguage();
    const isActive = props.show ? "is-active" : "";

    return (
        <div className={`modal ${isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className="message is-danger">
                    <div className="message-header">
                        <p>{lang.usModal.title}</p>
                        <button className="delete" aria-label="delete" onClick={() => props.toggleShowUsModal(false)}></button>
                    </div>
                    <div className="message-body message-letter">
                        <em>{lang.usModal.message_body1}</em><br></br>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowUsModal(false)}></button>
        </div>
    );
};
export default UsModal;