import React from "react";
import './gameStyle.css';
import {Card} from "react-bootstrap";

export interface GameCardProps {
    title: String;
    description: string;
    icon: JSX.Element;
}

const GameCard: React.FC<any> = (props: GameCardProps) => {

    return (
        <div>
         <Card className="gameCard">
             <p className="title-card">{props.title}</p> 
                <div className="mask">
                 <p className="description-card">{props.description}</p>
                </div>
             {props.icon}
         </Card>          
        </div>
    );
};
export default GameCard;