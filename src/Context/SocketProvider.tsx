
import React, { useContext } from "react";

interface SocketContextInterface {
    socket: string;
    setSocketId: (id: string)=> void;
}

const INITIAL_STATE: SocketContextInterface = {
    socket: "",
    setSocketId: () => {},
}


const SocketContext = React.createContext<SocketContextInterface>(INITIAL_STATE);
export const useSocket = () => {
    return useContext(SocketContext)
}
export const SocketProvider: React.FC<any> = ({children}) => {
    const [socket, setSocket] = React.useState("");

    const setSocketId = (id: string) => {
        setSocket(id);
    }
    return (
        <SocketContext.Provider value={{socket, setSocketId }}>
            {children}
        </SocketContext.Provider>
    );
}