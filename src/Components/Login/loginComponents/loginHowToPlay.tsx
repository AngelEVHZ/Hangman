import React from "react";
import { useLanguage } from "../../../Context/LanguageProvider";
import "./loginStyle.css";


const LoginHowToPlay: React.FC<any> = () => {
    const { lang } = useLanguage();

    return (
        <div className="howtoplaydiv">
            <div className="gradient-wrapper">
                <article className="message is-danger gradient-border" id="purple">
                    <div className="message-header">
                        <p> {lang.loginHowToPlay.title} </p>
                        {/*<button className="delete" aria-label="delete"></button>*/}
                    </div>
                    <div className="message-body">
                        <em>{lang.loginHowToPlay.message_body1} <strong>{lang.loginHowToPlay.message_body2}</strong></em><br></br><br></br>
                        <em><strong>{lang.loginHowToPlay.message_body3}</strong> {lang.loginHowToPlay.message_body4}</em><br></br>
                    </div>
                </article>
            </div>
        </div>
    );
};
export default LoginHowToPlay;