import { settings } from "cluster";
import { get } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../constant/NotifyActionEnum";
import { SocketActionEnum } from "../../constant/SocketActionEnum";
import { RandomWords } from "../../types/GameTypes";
import { NotifyResponse } from "../../types/NotifyResponse";
import { CreateSessionRequest, FinishRound, NotifyAll, PlayerWord, SetRandomWords, SocketAction, StartGame } from "../../types/SocketAction";
import { UserSession } from "../../types/UserSession";
import { useSettings } from "../SettingsProvider";
import { SettingsContextInterface } from "./UseSettingsState";

export interface SocketContextInterface {
    state: SocketState,
    conected: boolean,
    actions: {
        connect: () => void;
        joinGame: (nickName: string, gameId?: string) => void;
        closeSocket: () => void;
        sendWord: (word: string, round: number) => void;
        sendRandomWord: (words: RandomWords, round: number) => void;
        startGame: (rounds: number) => void;
        sendFinish: (completed: boolean, round: number, time: number) => void;
        sendShowScores: () => void;
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


    const connect = () => {
        try {
            const url = process.env.REACT_APP_ENV == "DEV" ? "" : process.env.REACT_APP_SOCKET;
            const webSocket = new WebSocket(url || "");
            webSocket.onopen = () => onOpen(webSocket);
            webSocket.onerror = (event: Event) => onError(event);
            webSocket.onmessage = (event: MessageEvent) => onMessage(event);
            webSocket.onclose = (event: CloseEvent) => onClose(event);
        } catch (error) {
            console.log(error);
        }
    };


    const onOpen = (webSocket: WebSocket) => {
        console.log("ON OPEN");
        setWebSocket(webSocket);
        setConected(true);
    };
    const onClose = (event: CloseEvent) => {
        console.log("ON CLOSE");
        settings.handle.setShowLoader(false);
    };
    const onError = (event: Event) => {
        console.log("ON ERROR", event);
        closeSocket();
    };

    const onMessage = (event: MessageEvent) => {
        console.log("ON Message", event);
        const local = { ...state };
        console.log("SOCKET LOCAL STATE", local);
        const message = JSON.parse(event.data) as NotifyResponse<any>;
        setState({ ...state, message: message });
    };

    useEffect(() => {
        if (!state.message) return;

        console.log("ACTION RECIVED", state.message);
        const message = get(state, "message", {}) as NotifyResponse<any>;
        switch (message.action) {
            case NotifyActionEnum.USER_DISCONNECTED:
            case NotifyActionEnum.USER_JOIN:
                updateUser(message);
                break;
        }

    }, [state.message]);

    const updateUser = (message: NotifyResponse<UserSession[]>) => {
        console.log("USER SESSION", message.data);
        settings.handle.saveUsers(message.data)
    };

    const closeSocket = () => {
        console.log("ON CLOSE SOCKET");
        if (webSocket) {
            webSocket.close();
            setWebSocket(null);
            setConected(false);
            setState({ message: null });
        }

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
                } as FinishRound,
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
                    action: NotifyGameActionEnum.SET_ROUND_WORDS
                } as SetRandomWords
            }
        }
        notify(data);
    }
    const startGame = (rounds: number) => {
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    rounds,
                    action: NotifyGameActionEnum.START_GAME
                } as StartGame
            }
        }
        notify(data);
    }

    const notify = (data: SocketAction<any>) => {
        if (webSocket) {
            webSocket.send(JSON.stringify(data));
        }
    }

    return {
        state,
        conected,
        actions: {
            connect,
            joinGame,
            closeSocket,
            sendWord,
            sendRandomWord,
            startGame,
            sendFinish,
            sendShowScores
        }
    };
}