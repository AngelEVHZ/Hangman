
import { useState } from "react";
import { PlayerSettings, UserSession, HostSettings } from "../../types/UserSession";
import { defaultTo, get } from "lodash";
import { CategoryEnum, WORDS_CATALOG } from "../../Constant/WordsCatalog";
import { StorageEnum } from "../../Constant/StorageEnum";
import { GameMatch, GameScore, PlayerScore } from "../../types/GameNormalTypes";
import { GAME_KIND } from "../../Constant/GameModesCatalog";
import { GameContraRelojMatch, GameContraRelojPlayer } from "../../types/GameContraRelojTypes";
import { PlayerStatusEnum } from "../../Constant/PlayerStatusEnum";
import { DEFAULT_ATTEMP, DEFAULT_DURATION, DEFAULT_ROUND, DEFAULT_SECRET_AUTHOR, GamesConfiguration } from "../../types/GamesConfiguration";
import { useLanguage } from "../LanguageProvider";

export interface SettingsContextInterface {
    handle: {
        updatePlayerStatus: (status: PlayerStatusEnum) => void;
        initMatch: (GC: GamesConfiguration, gameKind: string) => void;
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
        setContraRelojMatch: (match: GameContraRelojMatch) => void;
        getWordById: (wordIndex: number) => string;
        getRandomNumber: (max: number, min: number) => number;
        updateGamesConfiguration: (newConfig: GamesConfiguration) => void;
        getWordCatalogSize: () => number;
    },
    state: {
        playerStatus: PlayerStatusEnum;
        playerSettings: PlayerSettings;
        players: UserSession[];
        currentMatch: GameMatch;
        contraRelojMatch: GameContraRelojMatch;
        isPlaying: boolean;
        gameKindSelected: string;
        hostSettings: HostSettings | null;
        matchPlayers: UserSession[];
        gamesConfiguration: GamesConfiguration;
    }
}

const prefix = "hangman-";
export const UseSettingsState = (): SettingsContextInterface => {
    const lang = useLanguage();
    const [playerStatus, setPlayerStatus] = useState<PlayerStatusEnum>(PlayerStatusEnum.NOT_IN_SESSION);
    const [players, setPlayers] = useState<UserSession[]>([]);
    const [playerSettings, setPlayerSettings] = useState<PlayerSettings>({
        playerId: "",
        gameId: "",
        nickName: "",
        host: false,
    });
    const [hostSettings, setHostSettings] = useState<HostSettings | null>(null);
    const [currentMatch, setMatch] = useState<GameMatch>({ score: [], rounds: 0 });
    const [contraRelojMatch, setContraRelojMatch] = useState<GameContraRelojMatch>({ score: {}, wordList: [] });

    const [matchPlayers, setMatchPlayers] = useState<UserSession[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameKindSelected, setGameKind] = useState("");

    const [gamesConfiguration, setGameConfiguration] = useState<GamesConfiguration>({
        global: {
            duration: DEFAULT_DURATION,
            secret_author: DEFAULT_SECRET_AUTHOR,
            attempts: DEFAULT_ATTEMP,
        },
        [GAME_KIND.NORMAL]: {
            rounds: DEFAULT_ROUND,
        },
        [GAME_KIND.CONTRA_RELOJ]: {
            category: CategoryEnum.MISCELLANEOUS,
        }
    })

    const finishMatch = () => {
        setIsPlaying(false);
        const match = { score: [], rounds: 0 };
        setMatch(match);
        saveItem(StorageEnum.GAME_MATCH, JSON.stringify({}));
    }

    const initMatch = (GC: GamesConfiguration, gameKind: string) => {
        switch (gameKind) {
            case GAME_KIND.NORMAL:
                initNormalGame(GC);
                break;
            case GAME_KIND.CONTRA_RELOJ:
                initContraRelojGame();
                break;
        }
    }

    const initNormalGame = (GC: GamesConfiguration,) => {
        const rounds = GC[GAME_KIND.NORMAL].rounds;
        const match: GameMatch = {
            score: [],
            rounds,
        }
        const localMatchPlayers = players;
        for (let i = 0; i < rounds; i++) {
            const score: GameScore = {};
            localMatchPlayers.forEach((player: UserSession) => {
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
        setMatchPlayers(localMatchPlayers);
        setMatch(match);
    }

    const initContraRelojGame = () => {
        const match: GameContraRelojMatch = {
            score: {},
            wordList: [],
        }
        const localMatchPlayers = players;
        localMatchPlayers.forEach((player: UserSession) => {
            match.score[player.playerId] = {
                ready: false,
                successWords: 0,
                failWords: 0,
                wordsPlayed: [],
                wordsPlayedZip: "",
                finish: false,
            } as GameContraRelojPlayer;
        });
        saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
        setIsPlaying(true);
        setMatchPlayers(localMatchPlayers);
        setContraRelojMatch(match);
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
        let localMatchPlayers = [...matchPlayers];
        const playersStillInGame: UserSession[] = [];
        localMatchPlayers.forEach((item) => {
            const find = newPlayers.find(player => player.playerId === item.playerId);
            if (find) {
                playersStillInGame.push(item);
            }
        });
        localMatchPlayers = playersStillInGame;
        setMatchPlayers(localMatchPlayers);
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
        setMatch({ score: [], rounds: 0 });
        localStorage.removeItem(prefix + "users");
        localStorage.removeItem(prefix + "player-settings");
        localStorage.removeItem(prefix + "game-match");
        localStorage.removeItem(prefix + "host-settings");
    }

    const existSession = () => {
        return getUsers().length > 0
    }

    const getRandomNumber = (max: number, min: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const getWordsCatalog = () => {
        const languageId = lang.languageId;
        const catalogSelected = gamesConfiguration[GAME_KIND.CONTRA_RELOJ].category;
        const catalog = WORDS_CATALOG[languageId][catalogSelected];
        return catalog || WORDS_CATALOG[languageId][CategoryEnum.MISCELLANEOUS];
    }

    const getWordCatalogSize = () => {
        const wordsCatalog = getWordsCatalog();
        return wordsCatalog.length;
    }

    const getRandomWord = () => {
        const wordsCatalog = getWordsCatalog();
        const size = wordsCatalog.length;
        const wordIndex = getRandomNumber(size, 0);
        return wordsCatalog[wordIndex] || wordsCatalog[0];
    }

    const getWordById = (wordIndex: number) => {
        const wordsCatalog = getWordsCatalog();
        return wordsCatalog[wordIndex] || wordsCatalog[0];
    }

    const updatePlayerStatus = (status: PlayerStatusEnum) => {
        setPlayerStatus(status);
    }

    const updateGamesConfiguration = (newConfig: GamesConfiguration) => {
        setGameConfiguration(newConfig);
    }

    return {
        handle: {
            getWordCatalogSize,
            updatePlayerStatus,
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
            setContraRelojMatch,
            getWordById,
            getRandomNumber,
            updateGamesConfiguration
        },
        state: {
            playerStatus,
            currentMatch: currentMatch,
            matchPlayers,
            players,
            playerSettings,
            isPlaying,
            gameKindSelected,
            hostSettings,
            contraRelojMatch,
            gamesConfiguration,
        }
    };
}