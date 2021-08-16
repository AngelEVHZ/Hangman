import React from "react";
import "./Modals.css";

interface UsModalProps {
    show: boolean;
    toggleShowUsModal: (value: boolean) => void;
}

const UsModal: React.FC<UsModalProps> = (props: UsModalProps) => {
    const isActive = props.show ? "is-active" : "";

    return (
        <div className={`modal ${isActive}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <article className="message is-danger">
                    <div className="message-header">
                        <p>Acerca de Nosotros:</p>
                    </div>
                    <div className="message-body message-letter">
                        <em>Somos un grupo de amigos que aman la programacion y que a traves de la pandemia , la cuarentena y el aburrimiento nace l aidea del juego.
                            Somos the best friends desde la Universidad :P
                        </em>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowUsModal(false)}></button>
        </div>
    );
};
export default UsModal;