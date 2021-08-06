import React, { useState } from "react";
import './gameStyle.css';

export interface GameCardProps {
    id: string;
    title: String;
    description: string;
    icon: JSX.Element;
    available: boolean;

}

interface GameCardLocalProps {
    item: GameCardProps;
    selected: boolean;
    selectGame: (item: GameCardProps) => void;
}

const GameCard: React.FC<any> = (props: GameCardLocalProps) => {
    const { item , selected} = props;
    const [onHover, setOnHover] = useState(false);
    const colorClass = onHover ? "game-card-hover" : selected ? "game-card-selected" : "";
    return (
        <div className="">
            {item.available &&
                <div className={`card gameCard ${colorClass}`}
                    onMouseEnter={() => setOnHover(true)}
                    onMouseLeave={() => setOnHover(false)}
                    onClick={() => props.selectGame(item)}>
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
                </div>
            }
            {!item.available &&
                <div className="card gameCard not-available">
                    <p className="title-card">{item.title}</p>
                    {item.icon}
                </div>

            }
        </div>
    );
};
export default GameCard;