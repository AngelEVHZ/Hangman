import React from "react";
import './playersStyle.css';
import {Dropdown} from "react-bootstrap";
import {Card} from "react-bootstrap";

const Players: React.FC<any> = () => {

    return (
        <div>
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                <Card>
                    <Card.Body>
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
                    </Card.Body>
                    <Card className="player">
                        <Card.Body>Facherito</Card.Body>
                    </Card>
                    <Card className="player">
                        <Card.Body>Facherito</Card.Body>
                    </Card>
                    <Card className="player">
                        <Card.Body>Facherito</Card.Body>
                    </Card>
                    <Card className="player">
                        <Card.Body>Facherito</Card.Body>
                    </Card>
                </Card>
                </div>
            </div>
            </div>
        </div>
    );
};
export default Players;