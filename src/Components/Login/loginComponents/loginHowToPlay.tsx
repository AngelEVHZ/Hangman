import React from "react";
import "./loginStyle.css";


const LoginHowToPlay: React.FC<any> = () => {

    return (
        <div className="howtoplaydiv">
            <div className="gradient-wrapper">
                <article className="message is-danger gradient-border" id="paletaColores">
                    <div className="message-header">
                        <p>¿Como Jugar?</p>
                        {/*<button className="delete" aria-label="delete"></button>*/}
                    </div>
                    <div className="message-body">
                        <strong>Invita Amigos</strong><br></br>
                        <a>Escribe Palabras</a><br></br>
                        <em>Comienza a Adivinar!!</em><br></br>
                    </div>
                </article>
            </div>
        </div>
    );
};
export default LoginHowToPlay;