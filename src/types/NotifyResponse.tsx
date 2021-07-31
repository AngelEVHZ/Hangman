import { NotifyActionType } from "../Constant/NotifyActionEnum";
export interface NotifyResponse<T> {
    action: NotifyActionType;
    data: T;
}
