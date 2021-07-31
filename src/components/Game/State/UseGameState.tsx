
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../../constant/NotifyActionEnum";
import { TimesEnum } from "../../../constant/Times";
import { useSettings } from "../../../context/SettingsProvider";
import { useSocket } from "../../../context/SocketProvider";
import { SettingsContextInterface } from "../../../context/State/UseSettingsState";
import { SocketContextInterface } from "../../../context/State/UseSocketState";
import { Routes } from "../../../constant/RoutesEnum";
import { RandomWords } from "../../../types/GameTypes";
import { FinishRound, NextRound, PlayerWord, SetRandomWords } from "../../../types/SocketAction";
import { GameMatch, ScoreResume, UserSession } from "../../../types/UserSession";

export interface GameProps {
    handle: {
        startGame: () => void;
        changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
        finishGameCallback: () => void;
        nextRound: () => void;
        getPlayerName: (playerId: string) => string;
    },
    timerMenu: {
        time: number;
        callBack: () => void;
    },
    timerGame: {
        time: number;
        callBack: () => void;
    },
    timerScores: {
        time: number;
        callBack: () => void;
    },
    state: {
        playersFinish: boolean;
        wordLetters: string[],
        userLetter: Array<string>;
        errors: boolean[],
        roundStart: boolean;
        completed: boolean;
        gameOver: boolean;
        isReady: boolean;
        players: UserSession[],
        match: GameMatch;
        scoreResume: ScoreResume;
        host: boolean;
        finishGame: boolean;
    }
}


export const UseGameState = (): GameProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();

    //GAME LOGIC VARS
    const [wordLetters, setWordLetters] = useState([""]);
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));
    const [currentKey, setKey] = useState({key:""});
    const [errors, setErrors] = useState(new Array(6).fill(false));
    const [gameOver, setGameover] = useState(false);
    const [completed, setCompleted] = useState(false);



    //GENERAL VARS
    const [roundStart, setRountStart] = useState(false);
    const [playersReady, setPlayersReady] = useState(false);
    const [playersFinish, setPlayersFinish] = useState(false);
    const [userWord, setUserWord] = useState("");
    const [userWordSended, setUserWordSended] = useState(false);
    const [currentRound, setRound] = useState(0);
    const [startDate, setStartDate] = useState<Date | null>(null);

    // TIMER
    const timerMenuCallback = () => {
        if (userWordSended) return;
        console.log("termino el tiempo");
        sendWord("time");
    }
    const timerGameCallback = () => {
        if (gameOver || !roundStart || completed) {
            return;
        }
        setGameover(true);
    }


    //GAME CALLBACK
    const finishGameCallback = () => {
        const seconds = getPlayedTime();
        settings.handle.setFinishGame(currentRound, completed, seconds);
        socket.actions.sendFinish(completed, currentRound, seconds);
        console.log("FINISH CALLBACK");
    }

    const getPlayedTime = (): number => {
        const finishDate = new Date();
        const _startDate = startDate as Date;
        const dif = finishDate.getTime() - _startDate.getTime();
        return dif / 1000;
    }

    const changeUserWord = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { value } = event.target;
        setUserWord(value);
    }

    const downHandler = (event: KeyboardEvent) => {
        const key = event.key;
        setKey({key});
    }

    const startGame = () => {
        if (userWordSended) return;
        const word = userWord.trim();
        if (!(word.length > 0)) return;

        sendWord(word);
    }

    const sendWord = (word: string) => {
        if (userWordSended) return;
        settings.handle.setPlayerWord(currentRound, word);
        socket.actions.sendWord(word, currentRound);
        setUserWordSended(true);
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
                case NotifyGameActionEnum.FINISH_ROUND:
                    const data: FinishRound = message.data as FinishRound;
                    settings.handle.setFinishGame(data.round, data.completed, data.time, data.playerId);
                    break;
                case NotifyGameActionEnum.SHOW_SCORES:
                    if (settings.state.playerSettings.host) return;
                    settings.handle.generateScore();
                    setPlayersFinish(true);
                    break;
                case NotifyGameActionEnum.NEXT_ROUND:
                    if (settings.state.playerSettings.host) return;
                    const nextRound: NextRound = message.data as NextRound;
                    setRound(nextRound.round);
                    endRound();
                    break;
                case NotifyGameActionEnum.END_MATCH:
                    history.push(Routes.DASHBOARD);
                    break;
            }
        }

    }, [socket.state.message]);


    useEffect(() => {
        if (!settings.state.playerSettings.host) return;

        if (!playersReady) {
            const allPlayerReady = settings.handle.allPlayerReady(currentRound);
            if (allPlayerReady) {
                const random = settings.handle.randomizeWords(currentRound);
                setRandomWords(random);
                console.log("NOTIFY RANDOM WORDS");
                socket.actions.sendRandomWord(random, currentRound);
            }
        }

        if (!playersFinish && (gameOver || completed)) {
            const allPlayerFinish = settings.handle.allPlayerFinish(currentRound);
            if (allPlayerFinish) {
                setTimeout(function () {
                    socket.actions.sendShowScores();
                    setPlayersFinish(true);
                    settings.handle.generateScore();

                }, 2500);
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
        const word = settings.handle.getPlayerTargetWord(currentRound).toLocaleUpperCase();
        setUserLetter(new Array(word.length).fill(" "));
        const wordArray = Array.from(word);
        setWordLetters(wordArray);
        setRountStart(true);
        setGameover(false);
        setCompleted(false);
        setErrors(new Array(6).fill(false))
        setStartDate(new Date());
    }

    const endRound = () => {
        setPlayersReady(false);
        setRountStart(false);
        setUserWordSended(false);
        setGameover(false);
        setCompleted(false);
        setPlayersFinish(false);
        setUserLetter([""]);
        setWordLetters([""]);
        setUserWord("");
    }

    const nextRound = () => {
        if (!settings.state.playerSettings.host) return;
        
        const nextRountNumber = currentRound + 1;
        if (nextRountNumber < settings.state.match.rounds) {
            socket.actions.sendNextRound(nextRountNumber);
            setRound(nextRountNumber);
            endRound();
        } else {
            socket.actions.sendEndMatch();
        }
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
            if (currentKey.key.toUpperCase() === wordLetters[i].toLocaleUpperCase()) {
                correct = true;
                userLetterCopy[i] = currentKey.key.toLocaleUpperCase();
            }
        }

        if (!correct) {
            validateError();
        }
        setCompleted(validateComplete(userLetterCopy, wordLetters));
        setUserLetter(userLetterCopy);
    }, [currentKey]);



    useEffect(() => {
        if (!socket.conected) {
            history.push(Routes.LOGIN);
        }
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
            playersFinish,
            isReady: settings.handle.isPlayerReady(currentRound),
            players: settings.state.players,
            match: settings.state.match,
            scoreResume: settings.state.scoreResume,
            host: settings.state.playerSettings.host,
            finishGame: (currentRound + 1) >= settings.state.match.rounds
        },
        timerMenu: {
            time: TimesEnum.SEC30,
            callBack: timerMenuCallback
        },
        timerGame: {
            time: TimesEnum.SEC60,
            callBack: timerGameCallback
        },
        timerScores: {
            time: TimesEnum.SEC15,
            callBack: nextRound,
        },
        handle: {
            getPlayerName: settings.handle.getPlayerName,
            finishGameCallback,
            changeUserWord,
            startGame,
            nextRound,
        }
    };
}