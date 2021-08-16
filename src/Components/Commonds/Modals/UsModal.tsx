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
                        <em>Somos un grupo de amigos que aman pasarla bien, jugando y creando juegos multijugador en linea. Queremos 
                            que tu y tus amigos se diviertan con nuestros juegos y asi pasen buenos ratos. :P
                        </em><br></br>
                    </div>
                </article>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => props.toggleShowUsModal(false)}></button>
        </div>
    );
};
export default UsModal;