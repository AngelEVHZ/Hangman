
import { useState, useEffect } from "react";
import { SocketContextInterface } from "../../../context/State/UseSocketState";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../shared/RoutesEnum";
import { useSocket } from "../../../context/SocketProvider";

export interface DashBoardProps {

}

interface LocalState {

}

const INITIAL_LOGIN_STATE: LocalState = {

}

export const UseDashboardState = (): DashBoardProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const [loginState, setLoginState] = useState<LocalState>(INITIAL_LOGIN_STATE);
    
    useEffect(() => {
        console.log("DASHBOARD",socket);
        if (!socket.conected) {
           // history.push(Routes.LOGIN);
        }
    }, []);


    return {
       
    };
}