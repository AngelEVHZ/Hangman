
import React, { useContext } from "react";
import { RandomWords } from "../types/GameTypes";
import { INITIAL_SOCKET_STATE, SocketContextInterface, UseSocketState } from "./State/UseSocketState";


const INITIAL_STATE: SocketContextInterface = {
    state: INITIAL_SOCKET_STATE,
    conected: false,
    actions: {
        notify: () => {},
        connect: () => { },
        joinGame: (nickName: string, gameId?: string) => { },
        closeSocket: () => { },
        sendWord: (word: string, round: number) => { },
        sendRandomWord: (words: RandomWords, round: number) => { },
        startGame: (rounds: number) => { },
        sendFinish: (completed: boolean, round: number, time: number) => { },
        sendShowScores: () => {},
        sendNextRound: (round: number) => {},
        sendEndMatch: () => {},
    }
}

const SocketContext = React.createContext<SocketContextInterface>(INITIAL_STATE);

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider: React.FC<any> = ({ children }) => {
    const socketProps = UseSocketState();

    return (
        <SocketContext.Provider value={{ ...socketProps }}>
            {children}
        </SocketContext.Provider>
    );
}