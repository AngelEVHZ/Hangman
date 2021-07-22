import React, { useEffect, useState } from "react";
import LetterInputs from "./GameComponents/LetterInputs";
import { UseGameState } from "./State/UseGameState";
import { useSocket } from "../../context/SocketProvider";
import { SocketContextInterface } from "../../context/State/UseSocketState";

const Game: React.FC<any> = () => {

    const socket: SocketContextInterface = useSocket();
    const props = UseGameState(socket);
  
    return (
        <div>
            Game
            <LetterInputs
                userLetter={props.userLetter}
                wordLetters={props.wordLetters}
            ></LetterInputs>
        </div>
    );
};
export default Game;