
import { useState } from "react";
import { PlayerSettings, UserSession } from "../../types/UserSession";
import { defaultTo } from "lodash";
export interface SettingsContextInterface {
    handle:{
        setShowLoader: (value: boolean) => void;
        saveUsers: (saveUsers: UserSession[]) => void;
        getUsers: () => UserSession[];
        deleteStorage: () => void;
        existSession: () => boolean;
        savePlayerSettings: (user: UserSession) => void;
    },
    state:{
        showLoader:boolean;
    }
}

const prefix = "hangman-";
export const UseSettingsState = (): SettingsContextInterface => {
    const [showLoader, setShowLoader] = useState<boolean>(false);


    const saveUsers = (saveUsers: UserSession[]) =>{
        console.log("SESSION SAVED");
        localStorage.setItem(prefix + "users", JSON.stringify(saveUsers));
    }
    const getUsers = (): UserSession[] => {
        return JSON.parse(defaultTo(localStorage.getItem(prefix + "users"),"[]")) as UserSession[];
    }

    const savePlayerSettings = (user: UserSession) =>{
        console.log("PlayerSettings SAVED");
        const player: PlayerSettings = {
            playerId: user.playerId,
            gameId: user.gameId,
            nickName: user.gameId,
            host: user.host
        }
        localStorage.setItem(prefix + "player-settings", JSON.stringify(player));
    }

    const getPlayerSettings = (): PlayerSettings => {
        return JSON.parse(defaultTo(localStorage.getItem(prefix + "player-settings"),"{}")) as PlayerSettings;
    }

  

    const deleteStorage = (): void =>{
        localStorage.removeItem(prefix + "users");
        localStorage.removeItem(prefix + "player-settings");
    }

    const existSession =() => {
        return getUsers().length > 0
    } 

    return {
        handle:{
            setShowLoader,
            saveUsers,
            getUsers,
            deleteStorage,
            existSession,
            savePlayerSettings
        },
        state:{
            showLoader,
        }
    };
}