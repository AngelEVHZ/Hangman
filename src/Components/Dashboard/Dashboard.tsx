import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import Players from "./dashboardComponents/players";
import { Button } from "react-bootstrap";
import './dashboardComponents/gameStyle.css';

import GameMode from "./dashboardComponents/gameMode";

const Dashboard: React.FC<any> = () => {
    const { handle, state } = UseDashboardState();

    return (
        <div>
            <div className="row mt-5">
                <div className="col-lg-3 col-md-12">
                    <Players players={state.players}></Players>
                </div>
                <div className="col-lg-7 col-md-12">
                    <GameMode catalog={state.gameCatalog} selectGame={handle.selectGame}></GameMode>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-3">
                            <Button className="btn btn-dashboard btn-play"
                                onClick={handle.startGame}
                                disabled={!state.gameSelected || !state.host || state.submited}
                            > PLAY</Button>
                        </div>
                        <div className="col-md-3">
                            <Button className="btn-dashboard btn-invite" onClick={handle.copyInvitation}> INVITE</Button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-12">
                    publicidad
                </div>
            </div>
        </div>
    );
};
export default Dashboard;