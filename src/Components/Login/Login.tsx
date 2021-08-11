import React from "react";
import Footer from "../Commonds/Footer/Footer";
import FloatingActionButton from "../Commonds/FloatingActionButton/FloatingActionButton"
import LoginForm from "./loginComponents/loginForm";
import LoginHowToPlay from "./loginComponents/loginHowToPlay";
import { UseLoginState } from "./State/UseLoginState";

const Login: React.FC<any> = () => {
   const {handle, state} = UseLoginState();
   return (
      <div>
         <div className="columns is-centered mt-6">
            <div className="column is-6">
               <LoginHowToPlay></LoginHowToPlay>
            </div>
            <div className="column is-6">
               <LoginForm  changeNickName={handle.changeNickName} 
               joinGame={handle.joinGame} 
               isJoining={state.isJoining}
               userName={state.userName}></LoginForm>
            </div>
         </div>
         <FloatingActionButton />
         <Footer />
      </div>
   );
};
export default Login;