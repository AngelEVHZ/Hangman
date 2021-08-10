
import { useState } from "react";
import { PlayerSettings, UserSession, HostSettings } from "../../types/UserSession";
import { defaultTo, get } from "lodash";
import { WordsCatalog } from "../../Constant/WordsCatalog";
import { StorageEnum } from "../../Constant/StorageEnum";
import { GameMatch, GameScore, PlayerScore } from "../../types/GameNormalTypes";

export interface SettingsContextInterface {
    handle: {
        initMatch: (rounds: number) => void;
        finishMatch: () => void;
        saveUsers: (saveUsers: UserSession[], updateHost?: boolean) => void;
        getUsers: () => UserSession[];
        deleteStorage: () => void;
        existSession: () => boolean;
        savePlayerSettings: (user: UserSession) => void;
        getPlayerName: (playerId: string) => string;
        getRandomWord: () => string;
        setGameKind: (gameId: string) => void;
        updateHost: (saveUsers: UserSession[]) => void;
        setHostUpdatedFalse: () => void;
        saveItem: (key: StorageEnum, item: string) => void;
        setIsPlaying: (isPlaying: boolean) => void;
        setMatch: (match: GameMatch) => void;
    },
    state: {
        playerSettings: PlayerSettings;
        players: UserSession[];
        currentMatch: GameMatch;
        isPlaying: boolean;
        gameKindSelected: string;
        hostSettings: HostSettings | null;
    }
}

const prefix = "hangman-";
export const UseSettingsState = (): SettingsContextInterface => {
    const [players, setPlayers] = useState<UserSession[]>([]);
    const [playerSettings, setPlayerSettings] = useState<PlayerSettings>({
        playerId: "",
        gameId: "",
        nickName: "",
        host: false,
    });
    const [hostSettings, setHostSettings] = useState<HostSettings | null>(null);
    const [currentMatch, setMatch] = useState<GameMatch>({ score: [], rounds: 0, players: [] });
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameKindSelected, setGameKind] = useState("");


    const finishMatch = () => {
        setIsPlaying(false);
        const match = { score: [], rounds: 0, players: [] };
        setMatch(match);
        saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
    }

    const initMatch = (rounds: number) => {
        const match: GameMatch = {
            score: [],
            rounds,
            players: players,
        }
        for (let i = 0; i < rounds; i++) {
            const score: GameScore = {};
            match.players.forEach((player: UserSession) => {
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
        saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
        setIsPlaying(true);
        setMatch(match);
    }


    const saveItem = (key: StorageEnum, item: string) => {
        localStorage.setItem(prefix + key, item);
    }
    const saveUsers = (saveUsers: UserSession[], setHost?: boolean) => {
        setPlayers(saveUsers);
        saveItem(StorageEnum.USERS, JSON.stringify(saveUsers));
        if (isPlaying) {
            updateMatchPlayers(saveUsers);
        }
        if (setHost) {
            updateHost(saveUsers);
        }
    }

    const updateMatchPlayers = (newPlayers: UserSession[]) => {
        const match = { ...currentMatch };
        const playersStillInGame: UserSession[] = [];
        match.players.forEach((item) => {
            const find = newPlayers.find(player => player.playerId === item.playerId);
            if (find) {
                playersStillInGame.push(item);
            }
        });
        match.players = playersStillInGame;
        saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
        setMatch(match);
    }


    const updateHost = (saveUsers: UserSession[]) => {
        const host = saveUsers.find((user) => user.host);
        if (host) {
            saveHostSettings(host);
            if (playerSettings.playerId == host.playerId)
                savePlayerSettings(host);
        } else {
            saveHostSettings(null);
        }
    }

    const setHostUpdatedFalse = () => {
        const host: HostSettings = { ...hostSettings } as HostSettings;
        host.updated = false;
        setHostSettings(host);
        saveItem(StorageEnum.HOST_SETTINGS, JSON.stringify(host));
    }

    const getUsers = (): UserSession[] => {
        return JSON.parse(defaultTo(localStorage.getItem(prefix + "users"), "[]")) as UserSession[];
    }

    const savePlayerSettings = (user: UserSession) => {
        const player: PlayerSettings = {
            playerId: user.playerId,
            gameId: user.gameId,
            nickName: user.nickName,
            host: user.host
        }
        setPlayerSettings(player);
        saveItem(StorageEnum.PLAYER_SETTINGS, JSON.stringify(player));
    }

    const saveHostSettings = (user: UserSession | null) => {
        if (user) {
            const host: HostSettings = {
                playerId: user.playerId,
                gameId: user.gameId,
                nickName: user.nickName,
                updated: hostSettings ? true : false,
            }
            setHostSettings(host);
            saveItem(StorageEnum.HOST_SETTINGS, JSON.stringify(host));
        } else {
            setHostSettings(null);
            saveItem(StorageEnum.HOST_SETTINGS, JSON.stringify({}));
        }
    }

    const getPlayerSettings = (): PlayerSettings => {
        return JSON.parse(defaultTo(localStorage.getItem(prefix + "player-settings"), "{}")) as PlayerSettings;
    }

    const getPlayerName = (playerId: string): string => {
        const player = players.find((player) => player.playerId == playerId);
        return get(player, "nickName", "");
    }

    const deleteStorage = (): void => {
        setPlayers([]);
        setPlayerSettings({
            playerId: "",
            gameId: "",
            nickName: "",
            host: false,
        });
        setMatch({ score: [], rounds: 0, players: [] });
        localStorage.removeItem(prefix + "users");
        localStorage.removeItem(prefix + "player-settings");
        localStorage.removeItem(prefix + "game-match");
        localStorage.removeItem(prefix + "host-settings");
    }

    const existSession = () => {
        return getUsers().length > 0
    }

    const getRandomNumber = (max: number, includeMax?: boolean) => {
        return (Math.floor(Math.random() * max) + (includeMax ? 1 : 0))
    }

    const getRandomWord = () => {
        const size = WordsCatalog.length;
        const wordIndex = getRandomNumber(size);
        return WordsCatalog[wordIndex] || WordsCatalog[0];
    }


    return {
        handle: {
            initMatch,
            finishMatch,
            saveItem,
            setGameKind,
            getRandomWord,
            saveUsers,
            getUsers,
            deleteStorage,
            existSession,
            savePlayerSettings,
            getPlayerName,
            updateHost,
            setHostUpdatedFalse,
            setIsPlaying,
            setMatch,
        },
        state: {
            currentMatch: currentMatch,
            players,
            playerSettings,
            isPlaying,
            gameKindSelected,
            hostSettings,
        }
    };
}