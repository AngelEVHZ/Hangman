import React, { useState } from "react";
import './gameStyle.css';
import { Card } from "react-bootstrap";

export interface GameCardProps {
    selected: boolean;
    id: string;
    title: String;
    description: string;
    icon: JSX.Element;
  
}

interface GameCardLocalProps {
    item: GameCardProps;
    selectGame: (item: GameCardProps) => void;
}

const GameCard: React.FC<any> = (props: GameCardLocalProps) => {
    const {item} = props;
    const [onHover, setOnHover] = useState(false);
    const colorClass = onHover ? "game-card-hover" : item.selected ? "game-card-selected" : "";
    return (
        <div className="">
            <Card className={`gameCard ${colorClass}`}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                onClick={()=>props.selectGame(item)}>
                {!onHover &&
                    <>
                        <p className="title-card">{item.title}</p>
                        {item.icon}
                    </>
                }
                {onHover &&
                    <div>
                        <p className="description-card">{item.description}</p>
                    </div>
                }
            </Card>
        </div>
    );
};
export default GameCard;