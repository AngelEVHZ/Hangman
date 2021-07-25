export enum NotifyActionEnum {
    SESSION_CREATED = "SESSION_CREATED",
    USER_JOIN = "USER_JOIN",
    USER_DISCONNECTED = "USER_DISCONNECTED",
    NOTIFY_ALL = "NOTIFY_ALL",
    NOTIFY_HOST = "NOTIFY_HOST",
    NOTIFY_PLAYERS = "NOTIFY_PLAYERS",
    SET_PLAYER_SETTINGS = "SET_PLAYER_SETTINGS",
}

export type NotifyActionType =
    NotifyActionEnum.SESSION_CREATED |
    NotifyActionEnum.USER_DISCONNECTED |
    NotifyActionEnum.NOTIFY_ALL |
    NotifyActionEnum.NOTIFY_HOST |
    NotifyActionEnum.NOTIFY_PLAYERS |
    NotifyActionEnum.SET_PLAYER_SETTINGS |
    NotifyActionEnum.USER_JOIN;