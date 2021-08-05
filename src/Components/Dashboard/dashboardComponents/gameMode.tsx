import React from "react";
import './gameStyle.css';
import GameCard, { GameCardProps } from "./gameCard";

interface GameModeProps {
    catalog: GameCardProps[];
    selectGame: (item: GameCardProps) => void;
}

const GameMode: React.FC<any> = (props: GameModeProps) => {

    return (
        <div>
            <div className="content">
                <div className="columns">
                    {props.catalog.map((card) => {
                        return (<div className="column is-one-quarter">
                            <GameCard item={card} selectGame={props.selectGame}></GameCard>
                        </div>)
                    }
                    )}
                </div>
            </div>
        </div>
    );
};
export default GameMode;