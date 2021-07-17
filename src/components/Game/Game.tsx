import React, { useEffect, useState } from "react";
import LetterInputs from "./GameComponents/LetterInputs";

const Game: React.FC<any> = () => {

    const wordLetters: string[] = ["h", "o", "l", "a", "", "h", "o", "l", "a"];
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));
    const [currentKey, setKey] = useState("");

    const downHandler = (event: KeyboardEvent) => {
        const key = event.key;
        setKey(key);
    }

    useEffect(() => {
        const userLetterCopy: string[] = [...userLetter];
        for (let i = 0; i < wordLetters.length; i++) {
            if (currentKey === wordLetters[i]) userLetterCopy[i] = currentKey;
        }
        setUserLetter(userLetterCopy);
    }, [currentKey]);

    useEffect(() => {
        window.addEventListener("keydown", (event) => { downHandler(event) });
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    }, []);


    return (
        <div>
            Game
            <LetterInputs
                userLetter={userLetter}
                wordLetters={wordLetters}
            ></LetterInputs>
        </div>
    );
};
export default Game;