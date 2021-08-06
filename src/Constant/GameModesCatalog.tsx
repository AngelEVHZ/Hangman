
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faStopwatch, faGift } from "@fortawesome/free-solid-svg-icons";
import { GameCardProps } from "../Components/Dashboard/dashboardComponents/gameCard";

export enum GAME_KIND {
    NORMAL = "mode-1",
    CONTRA_RELOJ = "mode-2",
};


export const GAME_CATALOG: GameCardProps[] = [
    {
        id: GAME_KIND.NORMAL,
        title: "Normal",
        description: "Modo de juego basico",
        available: true,
        icon: (<p><FontAwesomeIcon className="icon" icon={faQuestion} /></p>)
    },
    {
        id: GAME_KIND.CONTRA_RELOJ,
        available: true,
        title: "Contra Reloj",
        description: "Modo de juego basico",
        icon: (<p><FontAwesomeIcon className="icon" icon={faStopwatch} /></p>)
    },
    {
        id:"mode-3",
        available: false,
        title: "Proximamente",
        description: "Modo de juego basico",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
    {
        id:"mode-4",
        available: false,
        title: "Proximamente",
        description: "Modo de juego basico",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
]
