
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
import { MAXIMUM_NICKNAME_WORDS } from "../../../Constant/UtilsConstants";
import { PlayerStatusEnum } from "../../../Constant/PlayerStatusEnum";

export interface UserProps {
    handle: {
        changeNickName: (event: React.ChangeEvent<HTMLInputElement>) => void;
        joinGame: () => void;
        toggleShowAboutModal: (value: boolean) => void;
        toggleShowUsModal: (value: boolean) => void;
        toggleShowCreditsModal: (value: boolean) => void;
    },
    state: {
        isJoining: boolean;
        userName: string;
        showAboutModal: boolean;
        showUsModal: boolean;
        showCreditsModal: boolean;

    }
}

interface LocalState {
    userName: string;
}

const INITIAL_LOGIN_STATE: LocalState = {
    userName: ""
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
    const [showAboutModal, toggleShowAboutModal] = useState<boolean>(false);
    const [showUsModal, toggleShowUsModal] = useState<boolean>(false);
    const [showCreditsModal, toggleShowCreditsModal] = useState<boolean>(false);

    useEffect(() => {
        settings.handle.updatePlayerStatus(PlayerStatusEnum.NOT_IN_SESSION);
        utils.handle.setShowHeader(true);
        if (settings.handle.existSession() || socket.conected) {
            socket.actions.closeSocket();
            settings.handle.deleteStorage();
        };
        setLoaded(true);
    }, []);

    const changeNickName = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { value } = event.target;

        if (value.length > MAXIMUM_NICKNAME_WORDS) return;
        setLoginState({ ...loginState, userName: value });
    }

    const validateNickeName = () => {
        return loginState.userName.trim().length > 0;
    }

    const joinGame = () => {
        if (!validateNickeName()) return;

        settings.handle.updatePlayerStatus(PlayerStatusEnum.ON_LOG_IN);
        utils.handle.setShowLoader(true);
        socket.actions.connect();
    }

    useEffect(() => {
        if (!loaded) return;

        if (socket.conected && validateNickeName()) {
            socket.actions.joinGame(loginState.userName, defaultTo(gameId, undefined));
        } else {
            utils.handle.setShowLoader(false);
        }
    }, [socket.conected]);

    useEffect(() => {
        if (!loaded || !socket.state.message) return;
        utils.handle.log("MESSAGE", socket.state.message);
        utils.handle.setShowLoader(false);
        const data = socket.state.message;
        const action = get(data, "action");
        if (action == NotifyActionEnum.SESSION_CREATED) {
            settings.handle.saveUsers(data.data, true);
            settings.handle.savePlayerSettings(data.data[0]);
            history.push(Routes.DASHBOARD);

        } else if (gameId && action == NotifyActionEnum.USER_JOIN) {
            const users = data.data as UserSession[];
            const owner = users.find((user) => user.owner);
            if (owner) {
                settings.handle.saveUsers(data.data, true);
                settings.handle.savePlayerSettings(defaultTo(owner, {} as UserSession));
                history.push(Routes.DASHBOARD);
            }
        }

    }, [socket.state.message]);

    return {
        handle: {
            changeNickName,
            joinGame,
            toggleShowAboutModal,
            toggleShowUsModal,
            toggleShowCreditsModal,
        },
        state: {
            isJoining: gameId ? true : false,
            userName: loginState.userName,
            showAboutModal,
            showUsModal,
            showCreditsModal,
        }
    };
}