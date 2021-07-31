import React from "react";
import "./loginStyle.css";


const LoginHowToPlay: React.FC<any> = () => {

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col">
                    <div className="howtoplay">
                        <h1>¿Como Jugar?</h1>
                        <div>
                                <h3>Invita Amigos</h3>
                                <h3>Escribe Palabras</h3>
                                <h3>Comienza a Adivinar!!</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginHowToPlay;