
import React, { useContext } from "react";
import { SettingsContextInterface, UseSettingsState } from "./State/UseSettingsState";



const INITIAL_STATE: SettingsContextInterface = {
    handle: {
        setShowLoader: () => { },
        saveUsers: () => { },
        savePlayerSettings: () => { },
        getUsers: () => { return [] },
        deleteStorage: () => { },
        existSession: () => { return false },
        initMatch: (rounds: number) => { },
        setPlayerWord: (roundIndex: number, word: string, playerId?: string) => { },
        isPlayerReady: (roundIndex: number, playerId?: string) =>  {return false},
        allPlayerReady: (roundIndex: number) => {},
    },
    state: {
        showLoader: false,
        playerSettings: {
            playerId: "",
            gameId: "",
            nickName: "",
            host: false,
        },
        players: [],
    }
}

const SettingsContext = React.createContext<SettingsContextInterface>(INITIAL_STATE);

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const SettingsProvider: React.FC<any> = ({ children }) => {
    const settingsProps = UseSettingsState();

    return (
        <SettingsContext.Provider value={{ ...settingsProps }}>
            {children}
        </SettingsContext.Provider>
    );
}