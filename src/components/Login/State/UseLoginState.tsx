
import { useState, useEffect } from "react";
import { SocketContextInterface } from "../../../context/State/UseSocketState";
import { defaultTo, get } from "lodash";
import { NotifyActionEnum } from "../../../constant/NotifyActionEnum";
import { useHistory, useLocation } from "react-router-dom";
import { Routes } from "../../../shared/RoutesEnum";
import { useSocket } from "../../../context/SocketProvider";
import { SettingsContextInterface } from "../../../context/State/UseSettingsState";
import { useSettings } from "../../../context/SettingsProvider";
import { UserSession } from "../../../types/UserSession";

export interface UserProps {
    handle: {
        changeNickName: (event: React.ChangeEvent<HTMLInputElement>) => void;
        joinGame: () => void;
    },
    state: {
        isJoining: boolean;
    }
}

interface LocalState {
    nickName: string;
}

const INITIAL_LOGIN_STATE: LocalState = {
    nickName: ""
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const UseLoginState = (): UserProps => {
    let query = useQuery();
    const gameId = query.get("game-id");
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();
    const [loginState, setLoginState] = useState<LocalState>(INITIAL_LOGIN_STATE);
    const [loaded, setLoaded] = useState<boolean>(false);

    const changeNickName = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = event.target;
        setLoginState({ ...loginState, nickName: value });
    }

    const validateNickeName = () => {
        return loginState.nickName.trim().length > 0;
    }

    const joinGame = () => {
        if (!validateNickeName()) return;
        settings.handle.setShowLoader(true);
        console.log("is conecting");
        socket.actions.connect();
    }

    useEffect(() => {
        if (settings.handle.existSession() || socket.conected) {
            socket.actions.closeSocket();
            settings.handle.deleteStorage();
            console.log("SE ELIMINO LA SESSION");
        };
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;

        if (socket.conected && validateNickeName()) {
            socket.actions.joinGame(loginState.nickName, defaultTo(gameId, undefined));
            console.log("SE CONECTO");
        } else {
            settings.handle.setShowLoader(false);
        }
    }, [socket.conected]);

    useEffect(() => {
        if (!loaded || !socket.state.message) return;
        console.log("MESSAGE", socket.state.message);

        settings.handle.setShowLoader(false);
        const data = socket.state.message;
        const action = get(data, "action");
        if (action == NotifyActionEnum.SESSION_CREATED) {
            settings.handle.saveUsers(data.data);
            settings.handle.savePlayerSettings(data.data[0]);
            history.push(Routes.DASHBOARD);

        } else if (gameId && action == NotifyActionEnum.USER_JOIN) {
            const users = data.data as UserSession[];
            const owner = users.find((user) => user.owner);
            if (owner) {
                settings.handle.saveUsers(data.data);
                settings.handle.savePlayerSettings(defaultTo(owner, {} as UserSession));
                history.push(Routes.DASHBOARD);
            }
        }

    }, [socket.state.message]);

    return {
        handle: {
            changeNickName,
            joinGame,
        },
        state: {
            isJoining: gameId ? true : false,
        }
    };
}