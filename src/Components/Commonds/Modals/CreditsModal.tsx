import React from "react";
import "./Modals.css";
import { useLanguage } from "../../../Context/LanguageProvider";

interface CreditsModalProps {
    show: boolean;
    toggleShowCreditsModal: (value: boolean) => void;
}

const CreditsModal: React.FC<CreditsModalProps> = (props: CreditsModalProps) => {
    const { lang } = useLanguage();
    const isActive = props.show ? "is-active" : "";

    return (
        <div className={`modal ${isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className="message is-danger">
                    <div className="message-header">
                        <p>{lang.creditsModal.title}</p>
                        <button className="delete" aria-label="delete" onClick={() => props.toggleShowCreditsModal(false)}></button>
                    </div>
                    <div className="message-body message-letter">
                        <div>{lang.creditsModal.icons_made}<a href="https://www.freepik.com" title="Freepik">Freepik</a> {lang.creditsModal.from} <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                        <div>{lang.creditsModal.icons_made}<a href="https://www.flaticon.es/autores/smalllikeart" title="smalllikeart">smalllikeart</a> {lang.creditsModal.from} <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowCreditsModal(false)}></button>
        </div>
    );
};
export default CreditsModal;