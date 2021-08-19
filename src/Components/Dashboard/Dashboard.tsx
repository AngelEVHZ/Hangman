import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import './dashboardComponents/gameStyle.css';

import GameMode from "./dashboardComponents/gameMode";
import Players from "../Commonds/Players/Players";

import AdSense from "react-adsense";

const Dashboard: React.FC<any> = () => {
    const { handle, state } = UseDashboardState();

    return (
        <div className="content m-5">
            <div className="columns">
                <div className="column is-3">
                    <Players players={state.players} showStatus={false}></Players>
                </div>
                <div className="column is-6">
                    <div className="on-mobile">
                        <GameMode
                            catalog={state.gameCatalog}
                            selectGame={handle.selectGame}
                            gameSelected={state.gameSelected}></GameMode>
                    </div>
                    <div className="is-hidden-mobile">
                        <br></br>
                        <br></br>
                    </div>
                    <br></br>
                    <div className="columns is-centered">
                        <div className="column is-one-fifth">
                            <button className="button is-large is-fullwidth is-primary btn-play"
                                onClick={handle.startGame}
                                disabled={!state.gameSelected || !state.host || state.submited}>PLAY</button>

                        </div>
                        <div className="column is-one-fifth">
                            <button className="button is-large is-fullwidth is-primary  btn-invite"
                                onClick={handle.copyInvitation}>INVITE</button>
                        </div>
                    </div>
                    {state.showUrl.show &&
                        <div className="columns is-centered">
                            <div className="column ">
                                <div className="notification is-warning is-light">
                                    <p className="subtitle">Copy the url:</p>
                                    <p className="subtitle ">{state.showUrl.url}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="column is-3">
                    <AdSense.Google
                        client='ca-pub-5609202792405393'
                        slot='1329533272'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                        layoutKey='-gw-1+2a-9x+5c'
                    />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;