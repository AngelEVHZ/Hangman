import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import Players from "./dashboardComponents/players";
import { Button } from "react-bootstrap";


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
                <Button className="btn btn-success" onClick={handle.startGame} disabled={!state.host || state.submited}> PLAY</Button>
                <Button className="m-5"> INVITE</Button>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;