
import React, { useContext } from "react";
import { PlayerStatusEnum } from "../Constant/PlayerStatusEnum";
import { RandomWords } from "../types/GameTypes";
import { ScoreResume } from "../types/UserSession";
import { SettingsContextInterface, UseSettingsState } from "./State/UseSettingsState";



const INITIAL_STATE: SettingsContextInterface = {
    handle: {
        saveUsers: () => { },
        savePlayerSettings: () => { },
        getUsers: () => { return [] },
        deleteStorage: () => { },
        existSession: () => { return false },
        initMatch: (rounds: number) => { },
        finishMatch: () => { },
        setPlayerWord: (roundIndex: number, word: string, playerId?: string) => { },
        isPlayerReady: (roundIndex: number, playerId?: string) => { return false },
        allPlayerReady: (roundIndex: number) => { return false },
        randomizeWords: (roundIndex: number) => { return {} as RandomWords },
        setRandomWords: (roundIndex: number, words: RandomWords) => { },
        getPlayerTargetWord: (roundIndex: number, playerId?: string) => { return "" },
        setFinishRound: (roundIndex: number, completed: boolean, time: number, playerId?: string) => { },
        allPlayerFinish: (roundIndex: number) => { return false },
        generateScore: () => { return { players: [] } as ScoreResume },
        getPlayerName: (playerId: string) => { return "" },
        getRandomWord: () => { return "" },
        setGameKind: (gameId: string) => { },
        updateHost: () => { },
        setHostUpdatedFalse: () => { },
        setMatchRound: (round: number) => { },
        setMatchRoundStarted: (started: boolean) => {},
        getPlayerStatus: (playerId: string) => { return PlayerStatusEnum.ON_DASHBOARD },
    },
    state: {
        playerSettings: {
            playerId: "",
            gameId: "",
            nickName: "",
            host: false,
        },
        match: {
            score: [],
            rounds: 0,
            players: [],
        },
        isPlaying: false,
        scoreResume: { players: [] },
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