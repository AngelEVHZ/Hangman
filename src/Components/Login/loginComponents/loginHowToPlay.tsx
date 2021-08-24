import React from "react";
import "./loginStyle.css";


const LoginHowToPlay: React.FC<any> = () => {

    return (
        <div className="howtoplaydiv">
            <div className="gradient-wrapper">
                <article className="message is-danger gradient-border" id="purple">
                    <div className="message-header">
                        <p> I N F O R M A C I Ó N </p>
                        {/*<button className="delete" aria-label="delete"></button>*/}
                    </div>
                    <div className="message-body">
                        <em>El clasico juego de el Ahorcado, ahora multijugador con hasta <strong>4 jugadores</strong></em><br></br><br></br>
                        <em><strong>Invita a tus Amigos</strong> y compitan en los nuevos y divertidos modos de juego.</em><br></br>                       
                    </div>
                </article>
            </div>
        </div>
    );
};
export default LoginHowToPlay;