import React from "react";
import "./Modals.css";

interface CreditsModalProps {
    show: boolean;
    toggleShowCreditsModal: (value: boolean) => void;
}

const CreditsModal: React.FC<CreditsModalProps> = (props: CreditsModalProps) => {
    const isActive = props.show ? "is-active" : "";

    return (
        <div className={`modal ${isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className="message is-danger">
                    <div className="message-header">
                        <p>Creditos:</p>
                        <button className="delete" aria-label="delete" onClick={() => props.toggleShowCreditsModal(false)}></button>
                    </div>
                    <div className="message-body message-letter">
                        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowCreditsModal(false)}></button>
        </div>
    );
};
export default CreditsModal;