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
                    </div>
                    <div className="message-body message-letter">
                        <em>Bulma</em><br></br>
                        <em>React</em><br></br>
                        <em>AWS</em><br></br><br></br>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowCreditsModal(false)}></button>
        </div>
    );
};
export default CreditsModal;