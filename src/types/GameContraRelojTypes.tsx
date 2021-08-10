import { NotifyGameActionEnum } from "../Constant/NotifyActionEnum";
import { UserSession } from "./UserSession";

export interface GameContraRelojMatch {
    score: GameContraRelojScore;
    players: UserSession[];
}

export interface GameContraRelojScore {
    [key: string]: GameContraRelojPlayer
}
export interface GameContraRelojPlayer {
    ready: boolean;
    successWords: number;
    failWords:number;
    wordsPlayed: WordPlayed[];

}
export interface WordPlayed {
    wordId: number;
    word: string;
    success: boolean;
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

export interface NotifyEndMatch {
    playerId: string;
    time: number;
    list: string;
    action: NotifyGameActionEnum.END_MATCH,
}