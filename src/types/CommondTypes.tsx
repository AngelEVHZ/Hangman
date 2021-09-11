export interface AlertMsgProps {
    type: AlertTypeEnum;
    msg: string;
    show: boolean;
}

export enum AlertTypeEnum {
    INFO = "is-warning",
    ERROR = "is-danger",
    NONE= "",
}

export interface IddleProps {
    activate: boolean;
    path: string;
}