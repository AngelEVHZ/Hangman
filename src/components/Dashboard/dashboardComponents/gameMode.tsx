import React from "react";
import './gameStyle.css';
import {Card} from "react-bootstrap";

const GameMode: React.FC<any> = () => {

    return (
        <div>
           <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    <Card className="gameCard">
                        <p>Normal</p>
                    </Card>
                    </div>
                    <div className="col-md-3">
                    <Card className="gameCard">
                        <p>Contra Reloj</p>
                    </Card>
                    </div>
                    <div className="col-md-3">
                    <Card className="gameCard">
                        <p>Proximamente</p>
                    </Card>
                    </div>
                    <div className="col-md-3">
                    <Card className="gameCard">
                        <p>Proximamente</p>
                    </Card>
                    </div>
                </div>
           </div>
        </div>
    );
};
export default GameMode;