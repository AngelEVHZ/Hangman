
import React, { useContext } from "react";
import { SettingsContextInterface, UseSettingsState } from "./State/UseSettingsState";



const INITIAL_STATE: SettingsContextInterface = {
    handle: {
        initMatch: (rounds: number) => {},
        finishMatch: () => {},
        saveUsers: () => { },
        savePlayerSettings: () => { },
        getUsers: () => { return [] },
        deleteStorage: () => { },
        existSession: () => { return false },
        getPlayerName: (playerId: string) => { return "" },
        getRandomWord: () => { return "" },
        setGameKind: (gameId: string) => { },
        updateHost: () => { },
        setHostUpdatedFalse: () => { },
        saveItem: () => {},
        setIsPlaying: () => {},
        setMatch: () => {},
    },
    state: {
        playerSettings: {
            playerId: "",
            gameId: "",
            nickName: "",
            host: false,
        },
        currentMatch: {
            score: [],
            rounds: 0,
            players: [],
        },
        isPlaying: false,
        players: [],
        gameKindSelected: "",
        hostSettings: null,
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