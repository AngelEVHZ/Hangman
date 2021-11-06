import { GAME_KIND } from "../Constant/GameModesCatalog";

export enum Duration {
    FAST = "fast",
    NORMAL = "normal",
    LOW = "low",
}
type DurationType = Duration.FAST | Duration.LOW | Duration.NORMAL;

export interface GamesConfiguration {
    global: {
        duration: DurationType,//Duradion de la partida
        secret_author: boolean; // Mostrar nombre de quien escribio la palabra
    },
    [GAME_KIND.NORMAL]: {
        rounds: number;
    }
}

//CONFIGURACIONES
export const DURATION_CATALOG = [Duration.LOW, Duration.NORMAL, Duration.FAST];
export const DEFAULT_DURATION = Duration.NORMAL;
export const DEFAULT_SECRET_AUTHOR = true;
export const ROUNDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const DEFAULT_ROUND = 3;

export const TIME_CATALOG = {
    [GAME_KIND.NORMAL]: {
        [Duration.FAST]: 30,
        [Duration.NORMAL]: 60,
        [Duration.LOW]: 120,
    },
    [GAME_KIND.CONTRA_RELOJ]: {
        [Duration.FAST]: 60,
        [Duration.NORMAL]: 90,
        [Duration.LOW]: 120,
    },
    [GAME_KIND.ELIMINATION]: {
        [Duration.FAST]: 30,
        [Duration.NORMAL]: 60,
        [Duration.LOW]: 120,
    },
    [GAME_KIND.PUNTUATION]: {
        [Duration.FAST]: 30,
        [Duration.NORMAL]: 60,
        [Duration.LOW]: 120,
    },
    [GAME_KIND.SEVERO]: {
        [Duration.FAST]: 30,
        [Duration.NORMAL]: 60,
        [Duration.LOW]: 120,
    },
}

export const GET_TIME = (kind: GAME_KIND, duration: Duration): number => {
    return TIME_CATALOG[kind][duration] || 60;
}