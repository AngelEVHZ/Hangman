
import { useState, useEffect } from "react";
import { SocketContextInterface } from "../../../context/State/UseSocketState";
import { get } from "lodash";
import { NotifyActionEnum } from "../../../constant/NotifyActionEnum";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../shared/RoutesEnum";
import { useSocket } from "../../../context/SocketProvider";
import { SettingsContextInterface } from "../../../context/State/UseSettingsState";
import { useSettings } from "../../../context/SettingsProvider";

export interface UserProps {
    handle: {
        changeNickName: (event: React.ChangeEvent<HTMLInputElement>) => void;
        joinGame: () => void;
    }
}

interface LocalState {
    nickName: string;
}

const INITIAL_LOGIN_STATE: LocalState = {
    nickName: ""
}

export const UseLoginState = (): UserProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();
    const [loginState, setLoginState] = useState<LocalState>(INITIAL_LOGIN_STATE);

    const changeNickName = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target;
        setLoginState({ ...loginState, nickName: value });
    }

    const joinGame = () => {
        settings.handle.setShowLoader(true);
        console.log("is conecting");
        socket.actions.connect();
    }


    useEffect(() => {
        console.log("IS CONECTED", socket);
        if (socket.conected) {
            console.log("SE CONECTO");
            socket.actions.joinGame(loginState.nickName);
        } else {
            settings.handle.setShowLoader(false);
        }
    }, [socket.conected]);

    useEffect(() => {
        settings.handle.setShowLoader(false);
        console.log("IS JOINED", socket);
        const data = socket.state.message;
        if (get(data,"action",) !=  NotifyActionEnum.SESSION_CREATED) {
            socket.actions.closeSocket();
            return;
        }
        console.log("LLEGO",socket.state);
        history.push(Routes.DASHBOARD);
        
    }, [socket.state.message]);

    return {
        handle: {
            changeNickName,
            joinGame,
        }
    };
}