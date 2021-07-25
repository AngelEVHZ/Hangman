
import { useState, useEffect } from "react";
import { SocketContextInterface } from "../../../context/State/UseSocketState";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../shared/RoutesEnum";
import { useSocket } from "../../../context/SocketProvider";
import { SettingsContextInterface } from "../../../context/State/UseSettingsState";
import { useSettings } from "../../../context/SettingsProvider";
import { UserSession } from "../../../types/UserSession";
import { settings } from "cluster";

export interface DashBoardProps {
    state: {
        players: UserSession[];
    },
    handle:{
        initMatch: () => void;
    }
}

interface LocalState {
   
}

const INITIAL_LOGIN_STATE: LocalState = {

}

export const UseDashboardState = (): DashBoardProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();
    const [loginState, setLoginState] = useState<LocalState>(INITIAL_LOGIN_STATE);

    useEffect(() => {
        console.log("DASHBOARD", socket);
        if (!socket.conected) {
            // history.push(Routes.LOGIN);
        }
    }, []);

    const initMatch = () => {
        settings.handle.initMatch(3);
        history.push(Routes.GAME);
    }

    return {
        state: {
            players: settings.state.players,
        },
        handle:{
            initMatch,
        }
    };
}