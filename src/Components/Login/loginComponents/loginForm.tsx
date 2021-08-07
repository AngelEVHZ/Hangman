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
                    <div>
                        <input type="text" id="login" className="fadeIn second" 
                            name="login" placeholder="Aqui tu nombre :)" onChange={props.changeNickName} 
                            value={props.userName}/>
                        <button className="button is-primary btn-big"
                            onClick={props.joinGame}>{btnText}</button>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default LoginForm;