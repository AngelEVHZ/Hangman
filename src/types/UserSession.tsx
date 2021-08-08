
export interface UserSession {
    gameId: string;
    nickName: string;
    host: boolean;
    conected: number;
    playerId: string;
    owner: boolean;
    isPlaying?: boolean;
}

export interface UserDisconected {
    nickName: string;
    playerId: string;
    conectedList: UserSession[];
}

export interface PlayerSettings {
    playerId: string;
    gameId: string;
    nickName: string;
    host: boolean;
}
export interface HostSettings {
    playerId: string;
    gameId: string;
    nickName: string;
    updated: boolean;
}
  
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