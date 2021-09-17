import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import './dashboardComponents/gameStyle.css';
import FloatingActionButtonMenu from "../Commonds/FloatingActionButtonMenu/FloatingActionButtonMenu"
import GameMode from "./dashboardComponents/gameMode";
import Players from "../Commonds/Players/Players";
import { useLanguage } from "../../Context/LanguageProvider";

const Dashboard: React.FC<any> = () => {
    const { handle, state } = UseDashboardState();
    const { lang } = useLanguage();

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
                    <div className="columns is-mobile is-centered center">
                        <div className="column is-half-mobile is-4">
                            <button className="button is-large is-fullwidth is-primary btn-play"
                                onClick={handle.startGame}
                                disabled={!state.gameSelected || !state.host || state.submited}>{lang.dashboard.play}</button>

                        </div>
                        <div className="column is-half-mobile is-4">
                            <button className="button is-large is-fullwidth is-primary  btn-invite"
                                onClick={handle.copyInvitation}>{lang.dashboard.invite}</button>
                        </div>
                    </div>
                    {state.showUrl.show &&
                        <div className="columns is-centered">
                            <div className="column ">
                                <div className="notification is-warning is-light">
                                    <p className="subtitle">{lang.dashboard.copy_url}</p>
                                    <p className="subtitle ">{state.showUrl.url}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="column is-3">
                   
                </div>
            </div>
            <FloatingActionButtonMenu />
        </div>
    );
};
export default Dashboard;