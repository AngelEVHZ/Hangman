import { useState } from "react";
import { SocketActionEnum } from "../../constant/SocketActionEnum";
import { CreateSessionRequest, SocketAction } from "../../types/SocketAction";


export interface SocketContextInterface {
    information:{};
    actions: {
        connect: () => void;
        joinGame: (nickName: string, gameId?: string) => void;
    };
}

export const UseSocketState = (): SocketContextInterface => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    
    const connect = () => {
        const webSocket = new WebSocket("URL");
        webSocket.onopen = () => onOpen(webSocket);
        webSocket.onerror = (event: Event) => onError(event);
        webSocket.onmessage = (event: MessageEvent) => onMessage(event);
    };


    const onOpen = (webSocket: WebSocket) => {
        console.log("ON OPEN");
        setWebSocket(webSocket);
    };
    const onError = (event: Event) => {
        console.log("ON ERROR", event);
        closeSocket();
    };
    const onMessage = (event: MessageEvent) => {
        console.log("ON Message",event);
    };
    const closeSocket = () => {
        if (webSocket) {
            webSocket.close();
            setWebSocket(null);
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
        information:{},
        actions: {
            connect,
            joinGame,
        }
    };
}