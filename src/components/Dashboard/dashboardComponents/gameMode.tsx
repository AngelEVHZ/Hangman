import React from "react";
import './gameStyle.css';
import GameCard, {GameCardProps} from "./gameCard";


const gameCards: GameCardProps[]=[
    {title: "Normal",
     description: "Modo de juego basico"},
    {title: "Contra Reloj",
    description: "Modo de juego basico"},
    {title: "Proximamente",
    description: "Modo de juego basico"},
    {title: "Proximamente",
    description: "Modo de juego basico"},
    {title: "Proximamente",
    description: "Modo de juego basico"}
]

const GameMode: React.FC<any> = () => {

    return (
        <div>
           <div className="container">
                <div className="row">
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