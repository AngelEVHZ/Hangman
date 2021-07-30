
import { useState, useEffect } from "react";
import { SocketContextInterface } from "../../../context/State/UseSocketState";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../shared/RoutesEnum";
import { useSocket } from "../../../context/SocketProvider";
import { SettingsContextInterface } from "../../../context/State/UseSettingsState";
import { useSettings } from "../../../context/SettingsProvider";
import { UserSession } from "../../../types/UserSession";
import { get } from "lodash";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../../constant/NotifyActionEnum";
import { StartGame } from "../../../types/SocketAction";


export interface DashBoardProps {
    state: {
        players: UserSession[];
        host: boolean;
        submited: boolean;
    },
    handle:{
        startGame: () => void;
        copyInvitation: () => void;
    }
}


export const UseDashboardState = (): DashBoardProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();
    const [gameStart, setGameStart] = useState<boolean>(false);
    
    useEffect(() => {
        if (!socket.conected) {
            history.push(Routes.LOGIN);
        }
    }, []);

    useEffect(() => {
        if (!socket.state.message) return;
        const message = socket.state.message;
        if (message.action == NotifyActionEnum.NOTIFY_ALL) {
            const action = get(message, "data.action", "");
            switch (action) {
                case NotifyGameActionEnum.START_GAME:
                    const data = message.data as StartGame;
                    initMatch(data.rounds);
                    break;
            }
        }

    }, [socket.state.message]);

    const initMatch = (rounds: number) => {
        settings.handle.initMatch(rounds);
        history.push(Routes.GAME);
    }

    const startGame = () => {
        setGameStart(true);
        socket.actions.startGame(3);
    }
    const copyInvitation = () => {
        const url = window.location.origin + "/?game-id="+ settings.state.playerSettings.gameId;
        navigator.clipboard.writeText(url)
        settings.handle.showAlert({show:true, type:"info",msg:"Invitacion copiada!"});
    }

    return {
        state: {
            players: settings.state.players,
            host: settings.state.playerSettings.host,
            submited: gameStart,
        },
        handle:{
            startGame,
            copyInvitation
        }
    };
}