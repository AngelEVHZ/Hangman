
import React, { useContext } from "react";
import { AlertMsgProps } from "../types/CommondTypes";
import { RandomWords } from "../types/GameTypes";
import { ScoreResume } from "../types/UserSession";
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
        allPlayerReady: (roundIndex: number) => {return false},
        randomizeWords: (roundIndex: number) => { return {} as RandomWords},
        setRandomWords: (roundIndex: number, words: RandomWords) => {},
        getPlayerTargetWord: (roundIndex: number, playerId?: string) => {return ""},
        setFinishGame: (roundIndex: number, completed: boolean, time: number, playerId?: string) => {},
        allPlayerFinish: (roundIndex: number) => {return false},
        generateScore: () => {return {players: []} as ScoreResume},
        getPlayerName: (playerId: string) => {return ""},
        showAlert: (alert: AlertMsgProps) => {},
    },
    state: {
        showLoader: false,
        playerSettings: {
            playerId: "",
            gameId: "",
            nickName: "",
            host: false,
        },
        alert: {show: false, msg:"", type:""},
        match:{
            score:[],
            rounds:0,
        },
        scoreResume: {players:[]},
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