import React from "react";
import LoginForm from "./loginComponents/loginForm";
import LoginHowToPlay from "./loginComponents/loginHowToPlay";
import { UseLoginState } from "./State/UseLoginState";

const Login: React.FC<any> = () => {
   const {handle, state} = UseLoginState();
   return (
      <div>
         <div className="columns">
            <div className="column">
               <LoginHowToPlay></LoginHowToPlay>
            </div>
            <div className="column">
               <LoginForm  changeNickName={handle.changeNickName} 
               joinGame={handle.joinGame} 
               isJoining={state.isJoining}></LoginForm>
            </div>
         </div>
      </div>
   );
};
export default Login;