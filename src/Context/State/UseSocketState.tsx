import { get } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../Constant/NotifyActionEnum";
import { SocketActionEnum } from "../../Constant/SocketActionEnum";
import { RandomWords } from "../../types/GameTypes";
import { NotifyResponse } from "../../types/NotifyResponse";
import { CreateSessionRequest, FinishRound, GenericNotify, NextRound, NotifyAll, PlayerWord, SetRandomWords, SocketAction, StartGame } from "../../types/SocketAction";
import { UserDisconected, UserSession } from "../../types/UserSession";
import { useSettings } from "../SettingsProvider";
import { useUtils } from "../UtilsProvider";
import { SettingsContextInterface } from "./UseSettingsState";
import { UtilsContextInterface } from "./UseUtilsState";

export interface SocketContextInterface {
    state: SocketState,
    conected: boolean,
    actions: {
        connect: () => void;
        joinGame: (nickName: string, gameId?: string) => void;
        closeSocket: () => void;
        sendWord: (word: string, round: number) => void;
        sendRandomWord: (words: RandomWords, round: number) => void;
        startGame: (rounds: number, gameKind: string) => void;
        sendFinish: (completed: boolean, round: number, time: number) => void;
        sendShowScores: () => void;
        sendNextRound: (round: number) => void;
        sendEndMatch: () => void;
        notify: (data: SocketAction<any>) => void;
    };
}
interface SocketState {
    message: NotifyResponse<any> | null;
}
export const INITIAL_SOCKET_STATE: SocketState = {
    message: null,
};

export const UseSocketState = (): SocketContextInterface => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [state, setState] = useState<SocketState>(INITIAL_SOCKET_STATE);
    const [conected, setConected] = useState<boolean>(false);
    const settings: SettingsContextInterface = useSettings();
    const utils: UtilsContextInterface = useUtils();
    const isDev = process.env.REACT_APP_DEV === "DEV";


    const connect = () => {
        try {
            const url = isDev ? "" : process.env.REACT_APP_SOCKET;
            const webSocket = new WebSocket(url || "");
            webSocket.onopen = () => onOpen(webSocket);
            webSocket.onerror = (event: Event) => onError(event);
            webSocket.onmessage = (event: MessageEvent) => onMessage(event);
            webSocket.onclose = (event: CloseEvent) => onClose(event);
        } catch (error) {
            utils.handle.log("ERROR", error);
            if (isDev) {
                setConected(true);
            }
        }
    };


    const onOpen = (webSocket: WebSocket) => {
        utils.handle.log("ON OPEN");
        setWebSocket(webSocket);
        setConected(true);
    };
    const onClose = (event: CloseEvent) => {
        utils.handle.log("ON CLOSE");
        utils.handle.setShowLoader(false);
        setWebSocket(null);
        setConected(false);
        setState({ message: null });
    };
    const onError = (event: Event) => {
        utils.handle.log("ON ERROR", event);
        closeSocket();
    };

    const onMessage = (event: MessageEvent) => {
        utils.handle.log("ON Message", event);
        const message = JSON.parse(event.data) as NotifyResponse<any>;
        setState({ ...state, message: message });
    };

    useEffect(() => {
        if (!state.message) return;
        utils.handle.log("ACTION RECIVED", state.message);
        const message = get(state, "message", {}) as NotifyResponse<any>;
        switch (message.action) {
            case NotifyActionEnum.USER_DISCONNECTED:
                const userDiconected = message.data as UserDisconected;
                utils.handle.showAlert({ show: true, type: "is-danger", msg: `${userDiconected.nickName} disconnected` });
                updateUser(userDiconected.conectedList);
                break;
            case NotifyActionEnum.HOST_DISCONNECTED:
                const hostDiconected = message.data as UserDisconected;
                utils.handle.showAlert({ show: true, type: "is-danger", msg: `HOST has disconected` });
                updateUser(hostDiconected.conectedList, true);
                break;
            case NotifyActionEnum.USER_JOIN:
                utils.handle.showAlert({ show: true, type: "is-info", msg: "User Connected" });
                updateUser(message.data);
                break;
        }

    }, [state.message]);

    const updateUser = (users: UserSession[], updateHost?: boolean) => {
        settings.handle.saveUsers(users)
        if (updateHost) settings.handle.updateHost(users);
    };

    const closeSocket = () => {
        utils.handle.log("ON CLOSE SOCKET");
        if (webSocket) {
            webSocket.close();
        }
        setWebSocket(null);
        setConected(false);
        setState({ message: null });

    };

    const joinGame = (nickName: string, gameId?: string) => {
        const data: SocketAction<CreateSessionRequest> = {
            action: SocketActionEnum.CONNECT_SESSION,
            data: {
                nickName,
                gameId,
            }
        }
        notify(data);
    }

    const sendWord = (word: string, round: number) => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: true,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    word,
                    round,
                    playerId: settings.state.playerSettings.playerId,
                    action: NotifyGameActionEnum.PLAYER_WORD
                } as PlayerWord
            }
        }
        notify(data);
    }

    const sendFinish = (completed: boolean, round: number, time: number) => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: true,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    time,
                    round,
                    completed,
                    seconds: 0,
                    playerId: settings.state.playerSettings.playerId,
                    action: NotifyGameActionEnum.FINISH_ROUND
                } as FinishRound,
            }
        }
        notify(data);
    }

    const sendShowScores = () => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: true,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    action: NotifyGameActionEnum.SHOW_SCORES
                } as GenericNotify,
            }
        }
        notify(data);
    }

    const sendRandomWord = (words: RandomWords, round: number) => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: true,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    words,
                    round,
                    action: NotifyGameActionEnum.SET_GAME_SETTINGS
                } as SetRandomWords
            }
        }
        notify(data);
    }
    const startGame = (rounds: number, gameKind: string) => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    rounds,
                    gameKind,
                    action: NotifyGameActionEnum.START_GAME
                } as StartGame
            }
        }
        notify(data);
    }

    const sendNextRound = (round: number) => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: true,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    round,
                    action: NotifyGameActionEnum.NEXT_ROUND
                } as NextRound,
            }
        }
        notify(data);
    }

    const sendEndMatch = () => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: false,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    action: NotifyGameActionEnum.END_MATCH
                } as GenericNotify,
            }
        }
        notify(data);
    }

    const notify = (data: SocketAction<any>) => {
        if (webSocket) {
            utils.handle.log("ON NOTIFY", data);
            webSocket.send(JSON.stringify(data));
        } else if (isDev) {
            DEV_MOCK(data);
        }
    }

    const DEV_MOCK = (data: SocketAction<any>) => {
        let message: any;
        switch (data.action) {
            case SocketActionEnum.CONNECT_SESSION:
                message = {
                    action: NotifyActionEnum.SESSION_CREATED,
                    data: [{
                        gameId: "123",
                        nickName: "DEVELOP",
                        host: true,
                        conected: 0,
                        playerId: "DEVELOP",
                        owner: true
                    }] as UserSession[]
                }
                break;
            case SocketActionEnum.NOTIFY_ALL:
                const parse = data.data as NotifyAll;
                if (!parse.excludeOwner) {
                    message = {
                        action: NotifyActionEnum.NOTIFY_ALL,
                        data: parse.notification,
                    };
                }
                break;
        }
        if (message) setState({ ...state, message });
    }

    return {
        state,
        conected,
        actions: {
            notify,
            connect,
            joinGame,
            closeSocket,
            sendWord,
            sendRandomWord,
            startGame,
            sendFinish,
            sendShowScores,
            sendNextRound,
            sendEndMatch
        }
    };
}