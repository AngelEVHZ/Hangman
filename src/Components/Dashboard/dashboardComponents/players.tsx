import React from "react";
import './playersStyle.css';
import { Card } from "react-bootstrap";
import { UserSession } from "../../../types/UserSession";


interface PlayerProps {
    players: UserSession[];
}
const Players: React.FC<PlayerProps> = (props: PlayerProps) => {
    const { players } = props;

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card className="card-player shadow p-3 mb-5 rounded">
                            {/*     <Card.Body>
                <Dropdown>
                     <Dropdown.Toggle variant="success" id="dropdown-basic">
                         4 Jugadores
                    </Dropdown.Toggle>

                     <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">5 Jugadores</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">6 Jugadores</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">8 Jugadores</Dropdown.Item>
                    </Dropdown.Menu>
               </Dropdown> 
                    </Card.Body>*/}
                            
                                {players.map((player) => {
                                    return (
                                        <Card  className="player" key={player.playerId}>
                                            <Card.Body>{player.nickName}</Card.Body>
                                        </Card>)
                                })}

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Players;