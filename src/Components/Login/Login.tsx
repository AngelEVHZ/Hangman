import React from "react";
import Footer from "../Commonds/Footer/Footer";
import FloatingActionButton from "../Commonds/FloatingActionButton/FloatingActionButton"
import AboutModal from "../Commonds/Modals/AboutModal";
import UsModal from "../Commonds/Modals/UsModal";
import CreditsModal from "../Commonds/Modals/CreditsModal";
import LoginForm from "./loginComponents/loginForm";
import LoginHowToPlay from "./loginComponents/loginHowToPlay";
import { UseLoginState } from "./State/UseLoginState";
import "./Login.css";

const Login: React.FC<any> = () => {
   const { handle, state } = UseLoginState();
   return (
      <div>
         <div className="columns is-centered mt-6">
            <div className="column is-6 isMobile">
               <LoginHowToPlay></LoginHowToPlay>
            </div>
            <div className="column is-6">
               <LoginForm changeNickName={handle.changeNickName}
                  joinGame={handle.joinGame}
                  isJoining={state.isJoining}
                  userName={state.userName}></LoginForm>
            </div>
         </div>
         <CreditsModal show={state.showCreditsModal} 
         toggleShowCreditsModal={handle.toggleShowCreditsModal}/>
         <AboutModal show={state.showAboutModal}
            toggleShowAboutModal={handle.toggleShowAboutModal} />
         <UsModal show={state.showUsModal}
            toggleShowUsModal={handle.toggleShowUsModal} />
         <FloatingActionButton toggleShowAboutModal={handle.toggleShowAboutModal}
            toggleShowUsModal={handle.toggleShowUsModal} 
            toggleShowCreditsModal={handle.toggleShowCreditsModal}/>
         <Footer />
      </div>
   );
};
export default Login;