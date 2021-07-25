import { useState } from "react";
import { SocketActionEnum } from "../../constant/SocketActionEnum";
import { NotifyResponse } from "../../types/NotifyResponse";
import { CreateSessionRequest, SocketAction } from "../../types/SocketAction";

export interface SocketContextInterface {
    state: SocketState,
    conected: boolean,
    actions: {
        connect: () => void;
        joinGame: (nickName: string, gameId?: string) => void;
        closeSocket: () => void;
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


    const connect = () => {
        try {
            const webSocket = new WebSocket("");
            webSocket.onopen = () => onOpen(webSocket);
            webSocket.onerror = (event: Event) => onError(event);
            webSocket.onmessage = (event: MessageEvent) => onMessage(event);   
        } catch (error) {
            console.log(error);
        }
    };


    const onOpen = (webSocket: WebSocket) => {
        console.log("ON OPEN");
        setWebSocket(webSocket);
        setConected(true);
    };
    const onError = (event: Event) => {
        console.log("ON ERROR", event);
        closeSocket();
    };
    const onMessage = (event: MessageEvent) => {
        console.log("ON Message",event);
        const local = {...state};
        console.log("SOCKET LOCAL STATE", local);
        const message = JSON.parse(event.data) as NotifyResponse<any>;
        setState({...state, message: message});
    };
    const closeSocket = () => {
        console.log("ON CLOSE SOCKET");
        if (webSocket) {
            webSocket.close();
            setWebSocket(null);
            setConected(false);
            setState({message: null});
        }
        
    };

    const joinGame = (nickName: string, gameId?: string) => {
        const data: SocketAction<CreateSessionRequest> = {
            action: SocketActionEnum.CONNECT_SESSION,
            data:{
                nickName,
                gameId,
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
        }
    };
}