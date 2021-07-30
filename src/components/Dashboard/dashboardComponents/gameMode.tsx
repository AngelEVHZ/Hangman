import React from "react";
import './gameStyle.css';
import GameCard, {GameCardProps} from "./gameCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faStopwatch, faGift } from "@fortawesome/free-solid-svg-icons";

const gameCards: GameCardProps[]=[
    {title: "Normal",
     description: "Modo de juego basico",
    icon: (<p><FontAwesomeIcon className="icon" icon={faQuestion} /></p>)},
    {title: "Contra Reloj",
    description: "Modo de juego basico",
    icon: (<p><FontAwesomeIcon className="icon" icon={faStopwatch} /></p>)},
    {title: "Proximamente",
    description: "Modo de juego basico",
    icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)},
    {title: "Proximamente",
    description: "Modo de juego basico",
    icon: (<p><FontAwesomeIcon className="icon" icon={faGift} /></p>)},
]

const GameMode: React.FC<any> = () => {

    return (
        <div>
           <div className="container">
                <div className="row d-flex justify-content-center">
                    {gameCards.map((card)=>{
                        return (<div className="col-md-3">
                        <GameCard {...card}></GameCard>
                        </div>)
                    }
                    )}
                </div>
           </div>
        </div>
    );
};
export default GameMode;