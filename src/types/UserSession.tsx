
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
  