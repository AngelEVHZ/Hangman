import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import Players from "./dashboardComponents/players";
import { Button } from "react-bootstrap";
import './dashboardComponents/gameStyle.css';

import GameMode from "./dashboardComponents/gameMode";

const Dashboard: React.FC<any> = () => {
    const {handle, state} = UseDashboardState();
    
    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                <Players players={state.players}></Players>
                </div>
                <div className="col-md-6">
                    <GameMode></GameMode>     
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-3">
                            <Button className="btn btn-dashboard btn-play" onClick={handle.startGame} disabled={!state.host || state.submited}> PLAY</Button>
                        </div>
                        <div className="col-md-3">
                            <Button className="btn-dashboard btn-invite"> INVITE</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;