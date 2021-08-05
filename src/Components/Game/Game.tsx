import React from "react";
import LetterInputs from "./GameComponents/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import Board from "./GameComponents/Board";
import MenuBoard from "./GameComponents/MenuBoard";
import Players from "../Dashboard/dashboardComponents/players";
import Timer from "../Commonds/Timer/Timer";
import GameScore from "./GameComponents/GameScore";

const Game: React.FC<any> = () => {
    const { handle, state, timerMenu, timerGame, timerScores } = UseGameState();

    return (
        <>
            <div className="content m-5">
                <div className="columns">
                    <div className="column is-one-fifth">
                        <Players players={state.players}></Players>
                    </div>
                    <div className="column">
                        {state.playersFinish &&
                            <div>
                                <GameScore
                                    host={state.host}
                                    match={state.match}
                                    scoreResume={state.scoreResume}
                                    getPlayerName={handle.getPlayerName}
                                    nextRound={handle.nextRound}
                                    timer={timerScores}
                                    finishGame={state.finishGame}
                                ></GameScore>
                            </div>

                        }
                        {!state.playersFinish && state.roundStart &&
                            <div className="card">
                                <header className="card-header">
                                    <Timer {...timerGame}
                                        time={timerGame.time}
                                        stop={state.gameOver || state.completed}
                                        callBack={timerGame.callBack}
                                    ></Timer>
                                </header>
                                <div className="card-content">
                                    <div className="content">
                                        <Board
                                            errors={state.errors}>
                                        </Board>
                                        <LetterInputs
                                            callBack={handle.finishGameCallback}
                                            userLetter={state.userLetter}
                                            wordLetters={state.wordLetters}
                                            gameOver={state.gameOver}
                                            completed={state.completed}
                                        ></LetterInputs>
                                    </div>
                                </div>
                            </div>
                        }
                        {!state.playersFinish && !state.roundStart &&
                            <MenuBoard handle={handle} isReady={state.isReady} timer={timerMenu}></MenuBoard>
                        }

                    </div>
                    <div className="column is-one-fifth">
                        PUBLICIDAD
                    </div>
                </div>
            </div>
        </>
    );
};
export default Game;