import React from "react";
import Board from "../../Commonds/Board/Board";
import LetterInputs from "../../Commonds/LetterInputs/LetterInputs";
import Players from "../../Commonds/Players/Players";
import Timer from "../../Commonds/Timer/Timer";
import TypedLetters from "../../Commonds/TypedLetters/TypedLetters";
import MenuContraReloj from "./GameComponents/MenuContraReloj";
import ScoreTable from "../../Commonds/ScoreTable/ScoreTable";
import { UseGameContraRelojState } from "./State/useGameContraRelojState";

const GameContraReloj: React.FC<any> = () => {
    const { handle, state } = UseGameContraRelojState();
    return (
        <>
            <div className="content m-5">
                <div className="columns">
                    <div className="column is-3">
                        <Players players={state.players} showStatus={true} getPlayerStatus={handle.getPlayerStatus}></Players>
                    </div>
                    <div className="column is-6">
                        {state.isGameCompleted &&
                            <div>
                                <ScoreTable
                                    {...state.scoreTable}
                                ></ScoreTable>
                            </div>

                        }
                        {!state.isGameCompleted && state.isGameStarted &&
                            <div className="card">
                                <header className="card-header p-3">
                                    <Timer
                                        time={state.gameTime}
                                        stop={state.isGameCompleted || state.stopTimer}
                                        callBack={handle.onTimeCallBack}
                                    ></Timer>
                                </header>
                                <div className="card-content">
                                    <div className="content">
                                        <TypedLetters letters={state.keyTypedList} />
                                        <Board
                                            errors={state.errors}>
                                        </Board>
                                        {state.showInputLetters &&
                                            <LetterInputs
                                                callBack={handle.onFinishHangmanRound}
                                                userLetter={state.userLetter}
                                                wordLetters={state.wordLetters}
                                                gameOver={state.wordGameOver}
                                                completed={state.wordCompleted}
                                            ></LetterInputs>
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {!state.isGameStarted &&
                            <MenuContraReloj handle={handle} isReadyToStart={state.isPlayerReadyToStart} timer={{ time: state.timeMenu }} />
                        }
                    </div>
                    <div className="column is-3">
                        PUBLICIDAD
                    </div>
                </div>
            </div>
        </>
    );
};
export default GameContraReloj;