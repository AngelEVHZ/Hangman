import { UserSession } from "./UserSession";

export interface GameMatch {
    score: GameScore[];
    rounds: number;
    players: UserSession[];
}
export interface GameScore {
    [key: string]: PlayerScore
}

export interface PlayerScore {
    score: number;
    finish: boolean;
    completed: boolean;
    time: number;
    originalWord: string;
    targetWord: string;
    ready: boolean;
}

export interface ScoreResume {
    players: PlayerScoreResume[]
}

export interface PlayerScoreResume {
    [key: string]: number[]
}