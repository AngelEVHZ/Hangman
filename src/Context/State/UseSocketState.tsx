import { settings } from "cluster";
import { get } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../Constant/NotifyActionEnum";
import { SocketActionEnum } from "../../Constant/SocketActionEnum";
import { RandomWords } from "../../types/GameTypes";
import { NotifyResponse } from "../../types/NotifyResponse";
import { CreateSessionRequest, FinishRound, GenericNotify, NextRound, NotifyAll, PlayerWord, SetRandomWords, SocketAction, StartGame } from "../../types/SocketAction";
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
        sendNextRound: (round: number) => void;
        sendEndMatch: () => void;
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
            console.log(error);
            if (isDev){
                setConected(true);
            }
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
        setWebSocket(null);
        setConected(false);
        setState({ message: null });
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
                settings.handle.showAlert({show:true, type:"warning", msg:"User Disconected"});
                updateUser(message);
                break;
            case NotifyActionEnum.USER_JOIN:
                settings.handle.showAlert({show:true, type:"primary", msg:"User Conected"});
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
            webSocket.send(JSON.stringify(data));
        } else if (isDev){
            DEV_MOCK(data);
        }
    }

    const DEV_MOCK = (data: SocketAction<any>) => {
       let message: any;
        switch(data.action) {
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