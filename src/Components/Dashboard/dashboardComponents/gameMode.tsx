import React from "react";
import './gameStyle.css';
import GameCard, { GameCardProps } from "./gameCard";

interface GameModeProps {
    catalog: GameCardProps[];
    selectGame: (item: GameCardProps) => void;
    gameSelected: string;
}

const GameMode: React.FC<any> = (props: GameModeProps) => {

    return (
        <div>
            <div className="content">
                <div className="columns is-multiline">
                    {props.catalog.map((card) => {
                        return (<div className="column is-4">
                            <GameCard selected={card.id === props.gameSelected} item={card} selectGame={props.selectGame}></GameCard>
                        </div>)
                    }
                    )}
                </div>
            </div>
        </div>
    );
};
export default GameMode;