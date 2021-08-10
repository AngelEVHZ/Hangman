
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
        description: "ADIVINA LA PALABRA DE TU ADVERSARIO",
        available: true,
        icon: (<p><FontAwesomeIcon className="icon" icon={faQuestion} /></p>)
    },
    {
        id: GAME_KIND.CONTRA_RELOJ,
        available: true,
        title: "Contra Reloj",
        description: "¡ADIVINA LO MAS QUE PUEDAS, PUES SE ACABA EL TIEMPO!",
        icon: (<p><FontAwesomeIcon className="icon" icon={faStopwatch} /></p>)
    },
    {
        id:"mode-3",
        available: false,
        title: "Puntuacion",
        description: "",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
    {
        id:"mode-4",
        available: false,
        title: "Severo",
        description: "",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
    {
        id:"mode-5",
        available: false,
        title: "Eliminacion",
        description: "",
        icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)
    },
]
