import React, { useState } from "react";
import './gameStyle.css';
import { Card } from "react-bootstrap";

export interface GameCardProps {
    title: String;
    description: string;
    icon: JSX.Element;
}

const GameCard: React.FC<any> = (props: GameCardProps) => {
    const [onHover, setOnHover] = useState(false);
    const colorClass = onHover ? "gameCardHover" : "";
    return (
        <div className="">
            <Card className={`gameCard ${colorClass}`}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}>
                {!onHover &&
                    <>
                        <p className="title-card">{props.title}</p>
                        {props.icon}
                    </>
                }
                {onHover &&
                    <div>
                        <p className="description-card">{props.description}</p>
                    </div>
                }
            </Card>
        </div>
    );
};
export default GameCard;