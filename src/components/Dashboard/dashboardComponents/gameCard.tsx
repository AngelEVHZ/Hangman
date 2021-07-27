import React from "react";
import './gameStyle.css';
import {Card} from "react-bootstrap";

export interface GameCardProps {
    title: string;
    description: string;
}

const GameCard: React.FC<any> = (props: GameCardProps) => {

    return (
        <div>
         <Card className="gameCard">
             <p>{props.title}</p> 
             <p>{props.description}</p>
         </Card>          
        </div>
    );
};
export default GameCard;