
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
import { PlayerStatusEnum } from "../../../Constant/PlayerStatusEnum";
import { AlertTypeEnum } from "../../../types/CommondTypes";
import { GamesConfiguration } from "../../../types/GamesConfiguration";


export interface DashBoardProps {
    state: {
        players: UserSession[];
        host: boolean;
        submited: boolean;
        gameCatalog: GameCardProps[];
        gameSelected: string;
        showUrl: { show: boolean, url: string };
        tabs: Array<boolean>;
    },
    handle: {
        startGame: () => void;
        copyInvitation: () => void;
        selectGame: (item: GameCardProps) => void;
        changeTab: (id: number) => void;
    }
}


export const UseDashboardState = (): DashBoardProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();
    const utils: UtilsContextInterface = useUtils();
    const [tabs, setTabs] = useState<Array<boolean>>([true, false]);
    const [gameStart, setGameStart] = useState<boolean>(false);
    const [showUrl, setShowUrl] = useState<{ show: boolean, url: string }>({ show: false, url: "" });

    useEffect(() => {
        settings.handle.updatePlayerStatus(PlayerStatusEnum.ON_DASHBOARD);
        utils.handle.setShowHeader(false);
        settings.handle.setGameKind("");
        if (!socket.conected) {
            history.push(Routes.LOGIN);
        }
        settings.handle.finishMatch();
    }, []);

    useEffect(() => {
        const iddleAction = utils.state.iddleAction;
        if (iddleAction.activate && iddleAction.path != Routes.LOGIN) {
            utils.handle.resetIddle();
            window.location.reload();
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
                    initMatch(data.gamesConfiguration, data.gameKind);
                    break;
            }
        }
    }, [socket.state.message]);

    const initMatch = (gamesConfiguration: GamesConfiguration, gameKind: string) => {
        utils.handle.setShowLoader(true);
        settings.handle.setGameKind(gameKind);
        settings.handle.updateGamesConfiguration(gamesConfiguration);
        setTimeout(() => {
            utils.handle.setShowLoader(false);
            settings.handle.initMatch(gamesConfiguration, gameKind);
            history.push(Routes.GAME_NAVIGATION);
        }, TimesEnum.START_GAME);

    }

    const startGame = () => {
        if (gameStart || !settings.state.playerSettings.host) return;
        setGameStart(true);
        const gameKind = settings.state.gameKindSelected;
        socket.actions.startGame(settings.state.gamesConfiguration, gameKind);
    }
    const copyInvitation = async () => {
        const url = window.location.origin + "/?game-id=" + settings.state.playerSettings.gameId;
        try {
            await window.navigator.clipboard.writeText(url);
            utils.handle.showAlert({ show: true, type: AlertTypeEnum.INFO, msg: "Invitacion copiada!" });
        } catch (error) {
            setShowUrl({ show: true, url });
        }

    }

    const changeTab = (id: number) => {
        let localTabs = [...tabs];
        for (let i = 0; i < localTabs.length; i++)
            localTabs[i] = false;
        localTabs[id] = true;
        setTabs(localTabs);
    }
    const selectGame = (item: GameCardProps) => {
        if (gameStart || !settings.state.playerSettings.host) return;
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
            tabs,
        },
        handle: {
            startGame,
            copyInvitation,
            selectGame,
            changeTab,
        }
    };
}