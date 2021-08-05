
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


export interface DashBoardProps {
    state: {
        players: UserSession[];
        host: boolean;
        submited: boolean;
        gameCatalog: GameCardProps[];
        gameSelected: string;
    },
    handle:{
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
    const [gameCatalog, UpdateCatalog] = useState<GameCardProps[]>([...GAME_CATALOG]);
    const [gameSelected, setGameSelected] = useState<string>("");

    
    useEffect(() => {
        const catalog = [...gameCatalog];
        unselectCatalog(catalog);
        UpdateCatalog(catalog);
        console.log(catalog);
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
    const copyInvitation = async () => {
        const url = window.location.origin + "/?game-id="+ settings.state.playerSettings.gameId;
        await window.navigator.clipboard.writeText(url);
        utils.handle.showAlert({show:true, type:"is-warning",msg:"Invitacion copiada!"});
    }

    const unselectCatalog = (catalog: GameCardProps[], defaultIdSeleted?: string) => {
        catalog.forEach( (game) => {
            game.selected = defaultIdSeleted ? game.id == defaultIdSeleted : false;
        })
    }

    const selectGame = (item: GameCardProps) => {
        const catalog = [...gameCatalog];
        unselectCatalog(catalog, item.id);
        setGameSelected(item.id);
        UpdateCatalog(catalog);
    }

    return {
        state: {
            players: settings.state.players,
            host: settings.state.playerSettings.host,
            submited: gameStart,
            gameCatalog,
            gameSelected
        },
        handle:{
            startGame,
            copyInvitation,
            selectGame
        }
    };
}