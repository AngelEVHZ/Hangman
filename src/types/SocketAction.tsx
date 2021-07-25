import { NotifyGameActionEnum } from "../constant/NotifyActionEnum";
import { SocketActionType } from "../constant/SocketActionEnum";
import { RandomWords } from "./GameTypes";

export interface SocketAction<T> {
    action: SocketActionType;
    data: T;
}
  

export interface CreateSessionRequest {
    nickName: string;
    gameId?: string;
}

export interface NotifyAll {
    excludeOwner?: boolean;
    gameId: string;
    notification: any;
}

export interface NotifyHost {
    socketId: string;
    notification: any;
}

export interface PlayerWord {
    playerId: string;
    word: string;
    round: number;
    action: NotifyGameActionEnum,
}

export interface SetRandomWords {
    words: RandomWords;
    round: number;
    action: NotifyGameActionEnum,
}

