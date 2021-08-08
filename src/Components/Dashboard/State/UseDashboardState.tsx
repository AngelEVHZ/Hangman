
import { useState, useEffect } from "react";
import { SocketContextInterface } from "../../../Context/State/UseSocketState";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../Constant/RoutesEnum";
import { useSocket } from "../../../Context/SocketProvider";
import { SettingsContextInterface } from "../../../Context/State/UseSettingsState";
import { useSettings } from "../../../Context/SettingsProvider";
import { UserSession } from "../../../types/UserSession";
import { get } from "lodash";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../../Constant/NotifyActionEnum";
import { StartGame } from "../../../types/SocketAction";
import { GAME_CATALOG } from "../../../Constant/GameModesCatalog";
import { GameCardProps } from "../dashboardComponents/gameCard";
import { useUtils } from "../../../Context/UtilsProvider";
import { UtilsContextInterface } from "../../../Context/State/UseUtilsState";
import { TimesEnum } from "../../../Constant/Times";


export interface DashBoardProps {
    state: {
        players: UserSession[];
        host: boolean;
        submited: boolean;
        gameCatalog: GameCardProps[];
        gameSelected: string;
        showUrl: { show: boolean, url: string };
    },
    handle: {
        startGame: () => void;
        copyInvitation: () => void;
        selectGame: (item: GameCardProps) => void;
    }
}


export const UseDashboardState = (): DashBoardProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();
    const utils: UtilsContextInterface = useUtils();
    const [gameStart, setGameStart] = useState<boolean>(false);
    const [showUrl, setShowUrl] = useState<{ show: boolean, url: string }>({ show: false, url: "" });

    useEffect(() => {
        settings.handle.setGameKind("");
        if (!socket.conected) {
            history.push(Routes.LOGIN);
        }
    }, []);

    useEffect(() => {
        const iddleAction = utils.state.iddleAction;
        if (iddleAction.activate && iddleAction.path != Routes.LOGIN) {
            utils.handle.resetIddle();
            history.push(Routes.LOGIN);
        }
    }, [utils.state.iddleAction]);

    useEffect(() => {
        if (!socket.state.message) return;
        const message = socket.state.message;
        if (message.action == NotifyActionEnum.NOTIFY_ALL) {
            const action = get(message, "data.action", "");
            switch (action) {
                case NotifyGameActionEnum.START_GAME:
                    const data = message.data as StartGame;
                    initMatch(data.rounds, data.gameKind);
                    break;
            }
        }

    }, [socket.state.message]);

    const initMatch = (rounds: number, gameKind: string) => {
        settings.handle.setGameKind(gameKind);
        setTimeout(() => {
            settings.handle.initMatch(rounds);
            history.push(Routes.GAME_NAVIGATION);
        }, TimesEnum.START_GAME);

    }

    const startGame = () => {
        if (gameStart) return;
        setGameStart(true);
        const gameKind = settings.state.gameKindSelected;
        socket.actions.startGame(3, gameKind);
    }
    const copyInvitation = async () => {
        const url = window.location.origin + "/?game-id=" + settings.state.playerSettings.gameId;
        try {
            await window.navigator.clipboard.writeText(url);
            utils.handle.showAlert({ show: true, type: "is-warning", msg: "Invitacion copiada!" });
        } catch (error) {
            setShowUrl({ show: true, url });
        }

    }

    const selectGame = (item: GameCardProps) => {
        settings.handle.setGameKind(item.id);
    }

    return {
        state: {
            players: settings.state.players,
            host: settings.state.playerSettings.host,
            submited: gameStart,
            gameCatalog: GAME_CATALOG,
            gameSelected: settings.state.gameKindSelected,
            showUrl,
        },
        handle: {
            startGame,
            copyInvitation,
            selectGame
        }
    };
}