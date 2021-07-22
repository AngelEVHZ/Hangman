
import React, { useContext } from "react";
import {SocketContextInterface, UseSocketState} from "./State/UseSocketState";


const INITIAL_STATE: SocketContextInterface = {
    information:{},
    actions: {
        connect: () => {},
        joinGame: (nickName: string, gameId?: string) => {}
    }
}

const SocketContext = React.createContext<SocketContextInterface>(INITIAL_STATE);

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider: React.FC<any> = ({children}) => {
    const socketProps = UseSocketState();

    return (
        <SocketContext.Provider value={{...socketProps}}>
            {children}
        </SocketContext.Provider>
    );
}