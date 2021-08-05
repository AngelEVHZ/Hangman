
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faStopwatch, faGift } from "@fortawesome/free-solid-svg-icons";
import { GameCardProps } from "../Components/Dashboard/dashboardComponents/gameCard";

export const GAME_CATALOG: GameCardProps[] = [
    {
        id:"mode-1",
        selected: false,
        title: "Normal",
        description: "Modo de juego basico",
        available: true,
        icon: (<p><FontAwesomeIcon className="icon" icon={faQuestion} /></p>)
    },
    {
        id:"mode-2",
        selected: false,
        available: true,
        title: "Contra Reloj",
        description: "Modo de juego basico",
        icon: (<p><FontAwesomeIcon className="icon" icon={faStopwatch} /></p>)
    },
    {
        id:"mode-3",
        selected: false,
        available: false,
        title: "Proximamente",
        description: "Modo de juego basico",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
    {
        id:"mode-4",
        selected: false,
        available: false,
        title: "Proximamente",
        description: "Modo de juego basico",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
]
