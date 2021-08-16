import React from "react";
import "./Modals.css";

interface AboutModalProps {
    show: boolean;
    toggleShowAboutModal: (value: boolean) => void;
}

const AboutModal: React.FC<AboutModalProps> = (props: AboutModalProps) => {
    const isActive = props.show ? "is-active" : "";

    return (
        <div className={`modal ${isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className="message is-danger">
                    <div className="message-header">
                        <p>Contactanos:</p>
                    </div>
                    <div className="message-body message-letter">
                        <em>Envianos tus comentarios a la siguiente dirección de correo:</em><br></br><br></br>
                        <strong><em>hangman.thegame.contacto@gmail.com</em></strong><br></br><br></br>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowAboutModal(false)}></button>
        </div>
    );
};
export default AboutModal;