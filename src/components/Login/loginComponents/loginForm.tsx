import React from "react";
import "./loginStyle.css";
import { useSocket } from "../../../Context/SocketProvider";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const LoginForm: React.FC<any> = () => {
    const { setSocketId } = useSocket();
    const history = useHistory();

    const clickButton = () => {
        
        history.push('/dashboard')
    }


    return (
 
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="Nickname" />
                        <Button className="fadeIn fourth" value="Start" onClick={() => setSocketId("SOCKETTT")} />
                        <Button className="fadeIn fourth" value="Start" onClick={() => clickButton()} />
                 
                       
                    </div>

                </div>
            </div>
        </div>
    
    );
};
export default LoginForm;