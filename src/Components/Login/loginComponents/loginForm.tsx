import React from "react";
import { useLanguage } from "../../../Context/LanguageProvider";
import "./loginStyle.css";
interface LoginFormProps {
    changeNickName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    joinGame: () => void;
    isJoining: boolean;
    userName: string;
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const { lang } = useLanguage();
    const btnText = props.isJoining ? lang.loginForm.join : lang.loginForm.create_room;
    return (
        <div>
            <div className="wrapper ">
                <div id="formContent">
                    <div className="">
                        <div className="columns is-centered">
                            <div className="column is-half ">
                                <figure className="image is-128x128 centerIcono">
                                    <img className="is-rounded color-white" src="https://image.flaticon.com/icons/png/512/74/74472.png" alt="Placeholder image"></img>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="text" id="login" className="fadeIn second"
                            name="login" placeholder={lang.loginForm.placeholder} onChange={props.changeNickName}
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