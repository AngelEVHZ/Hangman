
export interface UserSession {
    gameId: string;
    nickName: string;
    host: boolean;
    conected: number;
    playerId: string;
    owner: boolean;
}

export interface PlayerSettings {
    playerId: string;
    gameId: string;
    nickName: string;
    host: boolean;
}
  
export interface GameMatch {
    score: GameScore[];
    rounds: number;
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