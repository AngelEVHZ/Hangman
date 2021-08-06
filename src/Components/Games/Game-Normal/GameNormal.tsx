import React from "react";
import LetterInputs from "../../Commonds/LetterInputs/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import Board from "../../Commonds/Board/Board";
import MenuBoard from "./GameComponents/MenuBoard";
import Players from "../../Dashboard/dashboardComponents/players";
import Timer from "../../Commonds/Timer/Timer";
import ScoreTable from "../../Commonds/ScoreTable/ScoreTable";

const GameNormal: React.FC<any> = () => {
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
                                <ScoreTable
                                    host={state.host}
                                    match={state.match}
                                    scoreResume={state.scoreResume}
                                    getPlayerName={handle.getPlayerName}
                                    nextRound={handle.nextRound}
                                    timer={timerScores}
                                    finishGame={state.finishGame}
                                ></ScoreTable>
                            </div>

                        }
                        {!state.playersFinish && state.roundStart &&
                            <div className="card">
                                <header className="card-header p-3">
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
                            <MenuBoard handle={handle} isReady={state.isReady} timer={timerMenu} userWord={state.userWord}></MenuBoard>
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
export default GameNormal;