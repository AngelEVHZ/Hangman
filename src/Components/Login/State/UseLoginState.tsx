
import { useState, useEffect } from "react";
import { SocketContextInterface } from "../../../Context/State/UseSocketState";
import { defaultTo, get } from "lodash";
import { NotifyActionEnum } from "../../../Constant/NotifyActionEnum";
import { useHistory, useLocation } from "react-router-dom";
import { Routes } from "../../../Constant/RoutesEnum";
import { useSocket } from "../../../Context/SocketProvider";
import { useSettings } from "../../../Context/SettingsProvider";
import { UserSession } from "../../../types/UserSession";
import { SettingsContextInterface } from "../../../Context/State/UseSettingsState";
import { useUtils } from "../../../Context/UtilsProvider";
import { UtilsContextInterface } from "../../../Context/State/UseUtilsState";

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
    const utils: UtilsContextInterface = useUtils();
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
        utils.handle.setShowLoader(true);
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
            utils.handle.setShowLoader(false);
        }
    }, [socket.conected]);

    useEffect(() => {
        if (!loaded || !socket.state.message) return;
        console.log("MESSAGE", socket.state.message);

        utils.handle.setShowLoader(false);
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