import React from "react";
import "./loginStyle.css";
interface LoginFormProps {
    changeNickName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    joinGame: () => void;
    isJoining: boolean;
    userName: string;
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const btnText = props.isJoining ? "Unirse" : "Crear Sala";
    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="card-image">
                        <div className="columns is-centered">
                            <div className="column is-half ">
                                <figure className="image is-128x128 centerIcono">
                                    <img className="is-rounded" src="https://image.flaticon.com/icons/png/512/147/147140.png" alt="Placeholder image"></img>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="text" id="login" className="fadeIn second"
                            name="login" placeholder="Aqui tu nombre :)" onChange={props.changeNickName}
                            value={props.userName} />
                        <button className="button is-primary btn-big"
                            onClick={props.joinGame}>{btnText}</button>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default LoginForm;