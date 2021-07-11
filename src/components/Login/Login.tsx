import React from "react";
import LoginForm from "./loginComponents/loginForm";

const Login: React.FC<any> = () => {

    return (
      <div>
          <div className="row">
             <div className="col-md-6">
                <LoginForm></LoginForm>
             </div>
             <div className="col-md-6">
                
             </div> 
          </div>
      </div>
    );
};
export default Login;