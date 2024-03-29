import React from "react";
import { UseDashboardState } from "./State/UseDashboardState";
import './dashboardComponents/gameStyle.css';
import FloatingActionButtonMenu from "../Commonds/FloatingActionButtonMenu/FloatingActionButtonMenu"
import GameMode from "./dashboardComponents/gameMode";
import Players from "../Commonds/Players/Players";
import { useLanguage } from "../../Context/LanguageProvider";
import GameConfigurations from "./dashboardComponents/gameConfigurations";
import { get } from "lodash";

const Dashboard: React.FC<any> = () => {
    const { handle, state } = UseDashboardState();
    const { lang } = useLanguage();
    const tabsLabel = ["dashboard.game_modes", "dashboard.customize_game"];

    return (
        <div className="content m-5">
            <div className="columns">
                <div className="column is-3">
                    <Players players={state.players} showStatus={false}></Players>
                </div>
                <div className="column is-6">
                    <div className="tabs is-centered is-large">
                        <ul>
                            {tabsLabel.map((tab, index) => (
                                <li className={state.tabs[index] ? "is-active" : ""} onClick={() => handle.changeTab(index)}>
                                    <a className= "style-title">{get(lang, tab)}</a>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className="on-mobile">
                        <article className="message is-danger" id="purple">
                            <div className="message-body">
                                {state.tabs[0] &&
                                    <GameMode
                                        catalog={state.gameCatalog}
                                        selectGame={handle.selectGame}
                                        gameSelected={state.gameSelected}></GameMode>
                                }

                                {state.tabs[1] &&
                                    <GameConfigurations></GameConfigurations>
                                }
                            </div>

                        </article>

                    </div>
                    <div className="is-hidden-mobile">
                        <br></br>
                        <br></br>
                    </div>
                    <br></br>
                    {state.tabs[0] &&
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
                    }
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