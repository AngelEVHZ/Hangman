import React from "react";
import Players from "../../Commonds/Players/Players";
import MenuContraReloj from "./GameComponents/MenuContraReloj";
import ScoreTable from "../../Commonds/ScoreTable/ScoreTable";
import { UseGameContraRelojState } from "./State/useGameContraRelojState";
import GameBoard from "../../Commonds/GameBoard/GameBoard";

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
                            <GameBoard
                                timerTime={state.gameTime}
                                timerStop={state.isGameCompleted || state.stopTimer}
                                timerCallBack={handle.onTimeCallBack}
                                onFinishHangman={handle.onFinishHangmanRound}
                                showInputLetters={state.showInputLetters}
                                errors={state.errors}
                                keyTypedList={state.keyTypedList}
                                wordLetters={state.wordLetters}
                                userLetter={state.userLetter}
                                gameOver={state.wordGameOver}
                                completed={state.wordCompleted}
                            ></GameBoard>
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