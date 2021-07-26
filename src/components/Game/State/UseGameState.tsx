import { settings } from "cluster";
import _, { get } from "lodash";
import { useEffect, useState } from "react";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../../constant/NotifyActionEnum";
import { useSettings } from "../../../context/SettingsProvider";
import { useSocket } from "../../../context/SocketProvider";
import { SettingsContextInterface } from "../../../context/State/UseSettingsState";
import { SocketContextInterface } from "../../../context/State/UseSocketState";
import { RandomWords } from "../../../types/GameTypes";
import { NotifyResponse } from "../../../types/NotifyResponse";
import { PlayerWord, SetRandomWords } from "../../../types/SocketAction";
import { UserSession } from "../../../types/UserSession";

export interface GameProps {
    handle: {
        startGame: () => void;
        changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
    },
    timerMenu:{
        time: number;
        callBack: () => void;
    },
    timerGame:{
        time: number;
        callBack: () => void;
    }
    state: {
        wordLetters: string[],
        userLetter: Array<string>;
        errors: boolean[],
        roundStart: boolean;
        completed: boolean;
        gameOver: boolean;
        isReady: boolean;
        players: UserSession[],
    }
}


export const UseGameState = (): GameProps => {
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();

    //GAME LOGIC VARS
    const [wordLetters, setWordLetters] = useState([""]);
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));
    const [currentKey, setKey] = useState("");
    const [errors, setErrors] = useState(new Array(6).fill(false));
    const [gameOver, setGameover] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [currentRound, setRound] = useState(0);
    //GENERAL VARS
    const [roundStart, setRountStart] = useState(false);
    const [playersReady, setPlayersReady] = useState(false);
    const [userWord, setUserWord] = useState("");

    // TIMER
    const timerMenuCallback = () => {
        console.log("termino el tiempo");
    }
    const timerGameCallback = () => {
        console.log("termino el tiempo");
    }


    const changeUserWord = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { value } = event.target;
        setUserWord(value);
    }

    const downHandler = (event: KeyboardEvent) => {
        const key = event.key;
        setKey(key);
    }

    const startGame = () => {
        const word = userWord.trim();
        if (!(word.length > 0)) return;

        settings.handle.setPlayerWord(currentRound, word);
        socket.actions.sendWord(word, currentRound);
    }



    useEffect(() => {
        if (!socket.state.message) return;
        const message = socket.state.message;
        if (message.action == NotifyActionEnum.NOTIFY_ALL) {
            const action = get(message, "data.action", "");
            switch (action) {
                case NotifyGameActionEnum.PLAYER_WORD:
                    const playerWord: PlayerWord = message.data as PlayerWord;
                    settings.handle.setPlayerWord(playerWord.round, playerWord.word, playerWord.playerId);
                    break;
                case NotifyGameActionEnum.SET_ROUND_WORDS:
                    if (settings.state.playerSettings.host) return;
                    const randomWords: SetRandomWords = message.data as SetRandomWords;
                    setRandomWords(randomWords.words);
                    break;
            }
        }

    }, [socket.state.message]);


    useEffect(() => {
        if (settings.state.playerSettings.host && !playersReady) {
            const allPlayerReady = settings.handle.allPlayerReady(currentRound);
            if (allPlayerReady) {
                const random = settings.handle.randomizeWords(currentRound);
                setRandomWords(random);
                console.log("NOTIFY RANDOM WORDS");
                socket.actions.sendRandomWord(random, currentRound);
            }

        }
    });

    useEffect(() => {
        if (playersReady && !roundStart) {
            console.log("INICIAMOS ROUND");
            initRound();
        }
    }, [settings.state.match]);

    const setRandomWords = (random: RandomWords) => {
        setPlayersReady(true);
        settings.handle.setRandomWords(currentRound, random);
    }


    const initRound = () => {
        const word = settings.handle.getPlayerTargetWord(currentRound);
        setUserLetter(new Array(word.length).fill(" "));
        const wordArray = Array.from(word);
        setWordLetters(wordArray);
        setRountStart(true);
        setGameover(false);
        setCompleted(false);
        setErrors(new Array(6).fill(false))
    }

    const endRound = () => {
        setRountStart(false);
        setGameover(false);
        setCompleted(false);
        setPlayersReady(false);
    }

    const validateError = () => {
        const errorsCopy = [...errors];
        let gameOver = true;
        let updated = false;

        for (let i = 0; i < errorsCopy.length; i++) {
            if (!errorsCopy[i]) {
                gameOver = false;
                if (!updated) {
                    errorsCopy[i] = true;
                    updated = true;
                    if (i == (errorsCopy.length - 1)) gameOver = true;
                }
            }
        }
        setGameover(gameOver);
        setErrors(errorsCopy);
    }

    const validateComplete = (current: string[], target: string[]) => {
        return JSON.stringify(current) == JSON.stringify(target);
    }
    useEffect(() => {
        if (gameOver || !roundStart || completed) {
            return;
        }

        const userLetterCopy: string[] = [...userLetter];
        let correct = false;
        for (let i = 0; i < wordLetters.length; i++) {
            if (currentKey === wordLetters[i]) {
                correct = true;
                userLetterCopy[i] = currentKey;
            }
        }

        if (!correct) {
            validateError();
        }
        setCompleted(validateComplete(userLetterCopy, wordLetters));
        setUserLetter(userLetterCopy);
    }, [currentKey]);



    useEffect(() => {
        window.addEventListener("keydown", (event) => { downHandler(event) });
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    }, []);


    return {
        state: {
            wordLetters,
            userLetter,
            errors,
            roundStart,
            completed,
            gameOver,
            isReady: settings.handle.isPlayerReady(currentRound),
            players: settings.state.players,
        },
        timerMenu:{
            time: 10,
            callBack: timerMenuCallback
        },
        timerGame:{
            time: 20,
            callBack: timerGameCallback
        },
        handle: {
            changeUserWord,
            startGame,
        }
    };
}