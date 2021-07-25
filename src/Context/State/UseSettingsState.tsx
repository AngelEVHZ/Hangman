
import { useEffect, useState } from "react";
import { PlayerSettings, UserSession, GameMatch, GameScore, PlayerScore } from "../../types/UserSession";
import { defaultTo, get, words } from "lodash";
import { RandomWords, TargetWord } from "../../types/GameTypes";
import { stringify } from "querystring";

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
        allPlayerReady: (roundIndex: number) => boolean;
        randomizeWords: (roundIndex: number) => RandomWords;
        setRandomWords: (roundIndex: number, words: RandomWords) => void;
        getPlayerTargetWord: (roundIndex: number, playerId?: string) => string;
    },
    state: {
        showLoader: boolean;
        playerSettings: PlayerSettings;
        players: UserSession[];
        match: GameMatch;
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
        const score = getCurrentScore(roundIndex);
        if (!score[id]) return false;
        return  score[id].ready;
    }

    const allPlayerReady = (roundIndex: number): boolean => {
        if (roundIndex >= currentMatch.rounds) return false;
        const score = getCurrentScore(roundIndex);
        const size = players.length;
        for (let i = 0; i < size; i++) {
            const player = players[i];
            if(!score[player.playerId].ready) return false;
        }
        return true;
    }

    const getCurrentScore =(roundIndex: number): GameScore => {
        return currentMatch.score[roundIndex]
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

    const setRandomWords = (roundIndex: number, words: RandomWords) => {
        const match = { ...currentMatch };
        const score = match.score[roundIndex]
        players.forEach((player: UserSession) => {
            score[player.playerId].targetWord = words[player.playerId].word;
        });
        saveItem("game-match", JSON.stringify(match));
        setMatch(match);
    }

    const getPlayerTargetWord = (roundIndex: number, playerId?: string): string => {
        if (roundIndex >= currentMatch.rounds) return "";
        const id = playerId? playerId : playerSettings.playerId;
        const score = getCurrentScore(roundIndex);
        if (!score[id]) return "";
        return  score[id].targetWord;
    }

    const randomizeWords = (roundIndex: number): RandomWords => {
        const score = getCurrentScore(roundIndex);
        let randomWords: RandomWords = {};
        let orderer:{playerId:string, word:string}[] = [];
        let randomized:{playerId:string, word:string}[] = [];

        players.forEach((player: UserSession) => {
            orderer.push({playerId:player.playerId, word:score[player.playerId].originalWord});
            if ((Math.floor(Math.random() * 2) + 1) > 1) {
                randomized.push({playerId:player.playerId, word:""});
            } else {
                randomized.unshift({playerId:player.playerId, word:""});
            }
            randomWords[player.playerId]={word: score[player.playerId].originalWord} as TargetWord;
        });
    
        if (players.length <= 1) return randomWords;
        const size = players.length;
        for (let i = 0; i < size; i++) {
            const origin = orderer.pop();
            const target = randomized.find( (item => item.playerId != get(origin,"playerId")));
            randomized = randomized.filter(item => item.playerId != get(target,"playerId"));
            randomWords[get(target,"playerId","")].word =  get(origin,"word", "");    
        }
        
        console.log("randomWords",randomWords);
        return randomWords;
        
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
            allPlayerReady,
            randomizeWords,
            setRandomWords,
            getPlayerTargetWord,
        },
        state: {
            match: currentMatch,
            showLoader,
            players,
            playerSettings
        }
    };
}