import { NotifyGameActionEnum } from "../Constant/NotifyActionEnum";
export interface GameContraRelojMatch {
    score: GameContraRelojScore;
    wordList: string[];
}

export interface GameContraRelojScore {
    [key: string]: GameContraRelojPlayer
}
export interface GameContraRelojPlayer {
    ready: boolean;
    successWords: number;
    failWords:number;
    wordsPlayed: WordPlayed[];
    wordsPlayedZip: string;
    finish: boolean;
}
export interface WordPlayed {
    wordId: number;
    word: string;
    success: boolean;
}
export interface NotifyReady {
    playerId: string;
    action: NotifyGameActionEnum.PLAYER_IS_READY,
}

export interface NotifyWordList {
    wordList: string;
    action: NotifyGameActionEnum.SET_GAME_SETTINGS,
}

export interface NotifyEndMatch {
    playerId: string;
    wordsPlayedZip: string;
    successWords: number;
    failWords:number;
    action: NotifyGameActionEnum.END_MATCH,
    finish: boolean;
}