
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faStopwatch, faGift } from "@fortawesome/free-solid-svg-icons";
import { GameCardProps } from "../Components/Dashboard/dashboardComponents/gameCard";

export enum GAME_KIND {
    NORMAL = "mode-1",
    CONTRA_RELOJ = "mode-2",
    PUNTUATION = "mode-3",
    SEVERO = "mode-4",
    ELIMINATION = "mode-5",
};


export const GAME_CATALOG: GameCardProps[] = [
    {
        id: GAME_KIND.NORMAL,
        title: "Normal",
        description: "Escribe... y adivina",
        available: true,
        icon: (<p><FontAwesomeIcon className="icon" icon={faQuestion} /></p>)
    },
    {
        id: GAME_KIND.CONTRA_RELOJ,
        available: true,
        title: "Contra Reloj",
        description: "¡Adivina más palabras que los demas, antes de que se acabe el tiempo!",
        icon: (<p><FontAwesomeIcon className="icon" icon={faStopwatch} /></p>)
    },
    {
        id: GAME_KIND.PUNTUATION,
        available: false,
        title: "Puntuacion",
        description: "",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
    {
        id: GAME_KIND.SEVERO,
        available: false,
        title: "Severo",
        description: "",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
    {
        id: GAME_KIND.ELIMINATION,
        available: false,
        title: "Eliminacion",
        description: "",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
]
