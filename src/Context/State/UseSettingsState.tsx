
import { useEffect, useState } from "react";
import { PlayerSettings, UserSession, GameMatch, GameScore, PlayerScore } from "../../types/UserSession";
import { defaultTo } from "lodash";

export interface SettingsContextInterface {
    handle: {
        setShowLoader: (value: boolean) => void;
        saveUsers: (saveUsers: UserSession[]) => void;
        getUsers: () => UserSession[];
        deleteStorage: () => void;
        existSession: () => boolean;
        savePlayerSettings: (user: UserSession) => void;
        initMatch: (rounds: number) => void;
        setPlayerWord: (roundIndex: number, word: string, playerId?: string,) => void;
        isPlayerReady: (roundIndex: number, playerId?: string) =>  boolean;
        allPlayerReady: (roundIndex: number) => void;
    },
    state: {
        showLoader: boolean;
        playerSettings: PlayerSettings;
        players: UserSession[];
    }
}

const prefix = "hangman-";
export const UseSettingsState = (): SettingsContextInterface => {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [players, setPlayers] = useState<UserSession[]>([]);
    const [playerSettings, setPlayerSettings] = useState<PlayerSettings>({
        playerId: "",
        gameId: "",
        nickName: "",
        host: false,
    });

    const [currentMatch, setMatch] = useState<GameMatch>({ score: [], rounds: 0 });

    const initMatch = (rounds: number) => {
        const match: GameMatch = {
            score: [],
            rounds,
        }
        for (let i = 0; i < rounds; i++) {
            const score: GameScore = {};
            players.forEach((player: UserSession) => {
                score[player.playerId] = {
                    score: 0,
                    finish: false,
                    completed: false,
                    time: 0,
                    originalWord: "",
                    targetWord: "",
                    ready: false,
                } as PlayerScore;
            });
            match.score.push(score);
        }
        saveItem("game-match", JSON.stringify(match));
        setMatch(match);
    }

    const setPlayerWord = (roundIndex: number, word: string, playerId?: string) => {
        if (roundIndex >= currentMatch.rounds) return;
        const id = playerId? playerId : playerSettings.playerId;
        const match = { ...currentMatch };
        const score = match.score[roundIndex]
        if (!score[id]) return;
        score[id].originalWord = word;
        score[id].ready = true;
        saveItem("game-match", JSON.stringify(match));
        setMatch(match);
    }

    const isPlayerReady = (roundIndex: number, playerId?: string) => {
        if (roundIndex >= currentMatch.rounds) return false;
        const id = playerId? playerId : playerSettings.playerId;
        const match = { ...currentMatch };
        const score = match.score[roundIndex]
        if (!score[id]) return false;
        return  score[id].ready;
    }

    const allPlayerReady = (roundIndex: number) => {
        if (roundIndex >= currentMatch.rounds) return false;
        const match = { ...currentMatch };
        const score = match.score[roundIndex]
        players.forEach((player: UserSession) => {
            if(!score[player.playerId].ready) return false;
        });
        return true;
    }

    const saveItem = (key: string, item: string) => {
        localStorage.setItem(prefix + key, item);
    }
    const saveUsers = (saveUsers: UserSession[]) => {
        console.log("SESSION SAVED");
        setPlayers(saveUsers);
        saveItem("users", JSON.stringify(saveUsers));
    }
    const getUsers = (): UserSession[] => {
        return JSON.parse(defaultTo(localStorage.getItem(prefix + "users"), "[]")) as UserSession[];
    }

    const savePlayerSettings = (user: UserSession) => {
        console.log("PlayerSettings SAVED");
        const player: PlayerSettings = {
            playerId: user.playerId,
            gameId: user.gameId,
            nickName: user.gameId,
            host: user.host
        }
        setPlayerSettings(player);
        saveItem("player-settings", JSON.stringify(player));
    }

    const getPlayerSettings = (): PlayerSettings => {
        return JSON.parse(defaultTo(localStorage.getItem(prefix + "player-settings"), "{}")) as PlayerSettings;
    }

    useEffect(() => {
        //ONLY FOR TESTIN
        console.log("process.env.REACT_APP_DEV",process.env.REACT_APP_DEV);
        if (process.env.REACT_APP_DEV == "DEV") {
            const users = getUsers()
            saveUsers(users);
            savePlayerSettings(users[0]);
        }

    }, []);


    const deleteStorage = (): void => {
        localStorage.removeItem(prefix + "users");
        localStorage.removeItem(prefix + "player-settings");
        localStorage.removeItem(prefix + "game-match");
    }

    const existSession = () => {
        return getUsers().length > 0
    }


  
    return {
        handle: {
            isPlayerReady,
            setShowLoader,
            saveUsers,
            getUsers,
            deleteStorage,
            existSession,
            savePlayerSettings,
            initMatch,
            setPlayerWord,
            allPlayerReady
        },
        state: {
            showLoader,
            players,
            playerSettings
        }
    };
}