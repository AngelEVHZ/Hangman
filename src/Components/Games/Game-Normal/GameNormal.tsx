import React from "react";
import { UseGameState } from "./State/UseGameState";
import MenuBoard from "./GameComponents/MenuBoard";
import Players from "../../Commonds/Players/Players";
import ScoreTable from "../../Commonds/ScoreTable/ScoreTable";
import GameBoard from "../../Commonds/GameBoard/GameBoard";

const GameNormal: React.FC<any> = () => {
    const { handle, state, timerMenu, timerGame } = UseGameState();

    return (
        <>
            <div className="content m-5">
                <div className="columns">
                    <div className="column is-3">
                        <Players players={state.players} showStatus={true} getPlayerStatus={handle.getPlayerStatus}></Players>
                    </div>
                    <div className="column is-6">
                        {state.playersFinish &&
                            <div>
                                <ScoreTable
                                    {...state.scoreTable}
                                ></ScoreTable>
                            </div>

                        }
                        {!state.playersFinish && state.roundStart &&
                            <GameBoard
                                timerTime={timerGame.time}
                                timerStop={state.gameOver || state.completed}
                                timerCallBack={timerGame.callBack}
                                onFinishHangman={handle.finishGameCallback}
                                showInputLetters={true}
                                errors={state.errors}
                                keyTypedList={state.keyTypedList}
                                wordLetters={state.wordLetters}
                                userLetter={state.userLetter}
                                gameOver={state.gameOver}
                                completed={state.completed}
                            ></GameBoard>
                        }
                        {!state.playersFinish && !state.roundStart &&
                            <MenuBoard handle={handle} isReady={state.isReady} timer={timerMenu} userWord={state.userWord}></MenuBoard>
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
export default GameNormal;