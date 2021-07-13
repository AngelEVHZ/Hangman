import React from "react";
import LoginForm from "./loginComponents/loginForm";
import LoginHowToPlay from "./loginComponents/loginHowToPlay";

const Login: React.FC<any> = () => {

    return (
      <div>
          <div className="row">
             <div className="col-md-6">
                <LoginHowToPlay></LoginHowToPlay>
             </div>
             <div className="col-md-6">
                <LoginForm></LoginForm>
             </div> 
          </div>
      </div>
    );
};
export default Login;