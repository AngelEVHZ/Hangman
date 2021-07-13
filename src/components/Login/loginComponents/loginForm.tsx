import React from "react";
import "./loginStyle.css";


const LoginForm: React.FC<any> = () => {

    return (
        <div>
    <div className="wrapper fadeInDown">
    <div id="formContent">
    
        <div>
        <input type="text" id="login" className="fadeIn second" name="login" placeholder="Nickname"/>
        <input type="submit" className="fadeIn fourth" value="Start"/> 
        </div>

    </div>
    </div>
        </div>
    );
};
export default LoginForm;