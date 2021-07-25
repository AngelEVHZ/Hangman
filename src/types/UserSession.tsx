
export interface UserSession {
    socketId: string;
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
  