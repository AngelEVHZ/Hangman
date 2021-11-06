
import React, { useContext } from "react";
import { GAME_KIND } from "../Constant/GameModesCatalog";
import { PlayerStatusEnum } from "../Constant/PlayerStatusEnum";
import { Duration } from "../types/GamesConfiguration";
import { SettingsContextInterface, UseSettingsState } from "./State/UseSettingsState";



const INITIAL_STATE: SettingsContextInterface = {
    handle: {
        updatePlayerStatus: () => {},
        initMatch: () => { },
        finishMatch: () => { },
        saveUsers: () => { },
        savePlayerSettings: () => { },
        getUsers: () => { return [] },
        deleteStorage: () => { },
        existSession: () => { return false },
        getPlayerName: (playerId: string) => { return "" },
        setContraRelojMatch: () => { },
        getRandomWord: () => { return "" },
        setGameKind: (gameId: string) => { },
        updateHost: () => { },
        setHostUpdatedFalse: () => { },
        saveItem: () => { },
        setIsPlaying: () => { },
        setMatch: () => { },
        getWordById: () => { return "" },
        getRandomNumber: () => { return 0 },
        updateGamesConfiguration: () => {},
    },
    state: {
        playerStatus: PlayerStatusEnum.NOT_IN_SESSION,
        matchPlayers: [],
        playerSettings: {
            playerId: "",
            gameId: "",
            nickName: "",
            host: false,
        },
        currentMatch: {
            score: [],
            rounds: 0,
        },
        isPlaying: false,
        players: [],
        gameKindSelected: "",
        hostSettings: null,
        contraRelojMatch: { score: {}, wordList: [] },
        gamesConfiguration:{
            global: {
                duration: Duration.NORMAL,
                secret_author: true,
            },
            [GAME_KIND.NORMAL]: {
                rounds: 1
            }
        }
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