
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../../../Constant/NotifyActionEnum";
import { TimesEnum } from "../../../../Constant/Times";
import { useSettings } from "../../../../Context/SettingsProvider";
import { useSocket } from "../../../../Context/SocketProvider";
import { SettingsContextInterface } from "../../../../Context/State/UseSettingsState";
import { SocketContextInterface } from "../../../../Context/State/UseSocketState";
import { Routes } from "../../../../Constant/RoutesEnum";
import { RandomWords } from "../../../../types/GameTypes";
import { FinishRound, NextRound, PlayerWord, SetRandomWords } from "../../../../types/SocketAction";
import { UserSession } from "../../../../types/UserSession";
import { MAXIMUM_WORDS } from "../../../../Constant/UtilsConstants";
import { GameLogic, useGameLogic } from "./UseGameLogic";
import { PlayerStatusEnum } from "../../../../Constant/PlayerStatusEnum";
import { GameMatch } from "../../../../types/GameNormalTypes";
import { useCommondLogic } from "../../Commond-Logic/useCommondLogic";
import { ScoreTableProps } from "../../../Commonds/ScoreTable/ScoreTable";
import { useLanguage } from "../../../../Context/LanguageProvider";
import { GET_TIME } from "../../../../types/GamesConfiguration";
import { GAME_KIND } from "../../../../Constant/GameModesCatalog";
export interface GameProps {
    handle: {
        startGame: () => void;
        changeUserWord: (event: React.ChangeEvent<HTMLInputElement>) => void;
        finishGameCallback: () => void;
        nextRound: () => void;
        getPlayerName: (playerId: string) => string;
        getPlayerStatus: (playerId: string) => PlayerStatusEnum;
        onExternalKeyPress: (key: string) => void;
    },
    timerMenu: {
        time: number;
        callBack: () => void;
    },
    timerGame: {
        time: number;
        callBack: () => void;
    },
    state: {
        scoreTable: ScoreTableProps;
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
        userWord: string;
        keyTypedList: string[];
    }
}


export const UseGameState = (): GameProps => {
    const history = useHistory();
    const socket: SocketContextInterface = useSocket();
    const settings: SettingsContextInterface = useSettings();
    const gameLogic: GameLogic = useGameLogic();
    const { lang } = useLanguage();
    useCommondLogic();
    const attemps = settings.state.gamesConfiguration.global.attempts;

    //GAME LOGIC VARS
    const [originalLetters, setOriginalLetters] = useState([""]);
    const [wordLetters, setWordLetters] = useState([""]);
    const [userLetter, setUserLetter] = useState(new Array(wordLetters.length).fill(""));

    const [currentKey, setKey] = useState({ key: "" });
    const [errors, setErrors] = useState(new Array(attemps).fill(false));
    const [gameOver, setGameover] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [keyTypedList, setKeyTypedList] = useState<string[]>([]);


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
        const randomWord = settings.handle.getRandomWord();
        sendWord(randomWord);
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
        gameLogic.handle.setFinishRound(currentRound, completed, seconds);
        socket.actions.sendFinish(completed, currentRound, seconds);
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

        if (value.length > MAXIMUM_WORDS) return;

        let onlyLettersRegex = /^[a-zA-Z\s]*$/;
        if (!onlyLettersRegex.test(value)) return;

        setUserWord(value);
    }

    const startGame = () => {
        if (userWordSended) return;
        const word = userWord.trim();
        if (!(word.length > 0)) return;

        sendWord(word);
    }

    const sendWord = (word: string) => {
        if (userWordSended) return;
        gameLogic.handle.setPlayerWord(currentRound, word);
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
                    gameLogic.handle.setPlayerWord(playerWord.round, playerWord.word, playerWord.playerId);
                    break;
                case NotifyGameActionEnum.SET_GAME_SETTINGS:
                    if (settings.state.playerSettings.host) return;
                    const randomWords: SetRandomWords = message.data as SetRandomWords;
                    setRandomWords(randomWords.words);
                    break;
                case NotifyGameActionEnum.FINISH_ROUND:
                    const data: FinishRound = message.data as FinishRound;
                    gameLogic.handle.setFinishRound(data.round, data.completed, data.time, data.playerId);
                    break;
                case NotifyGameActionEnum.SHOW_SCORES:
                    if (settings.state.playerSettings.host) return;
                    gameLogic.handle.generateScore();
                    setPlayersFinish(true);
                    break;
                case NotifyGameActionEnum.NEXT_ROUND:
                    if (settings.state.playerSettings.host) return;
                    const nextRound: NextRound = message.data as NextRound;
                    gameLogic.handle.setMatchRound(nextRound.round);
                    gameLogic.handle.setMatchRoundStarted(false);
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
            const allPlayerReady = gameLogic.handle.allPlayerReady(currentRound);
            if (allPlayerReady) {
                const random = gameLogic.handle.randomizeWords(currentRound);
                setRandomWords(random);
                socket.actions.sendRandomWord(random, currentRound);
            }
        }

        if (!playersFinish && (gameOver || completed)) {
            const allPlayerFinish = gameLogic.handle.allPlayerFinish(currentRound);
            if (allPlayerFinish) {
                setTimeout(function () {
                    socket.actions.sendShowScores();
                    setPlayersFinish(true);
                    gameLogic.handle.generateScore();

                }, 2500);
            }
        }
    });

    useEffect(() => {
        if (playersReady && !roundStart) {
            initRound();
        }
    }, [settings.state.currentMatch]);


    const setRandomWords = (random: RandomWords) => {
        setPlayersReady(true);
        gameLogic.handle.setRandomWords(currentRound, random);
    }


    const initRound = () => {
        const originalWord = gameLogic.handle.getPlayerTargetWord(currentRound).toLocaleUpperCase();
        const wordNormalize = originalWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        setUserLetter(new Array(wordNormalize.length).fill(" "));
        setOriginalLetters(Array.from(originalWord));
        setWordLetters(Array.from(wordNormalize));
        setRountStart(true);
        setGameover(false);
        setCompleted(false);
        setErrors(new Array(attemps).fill(false))
        setStartDate(new Date());
        setKeyTypedList([]);
        gameLogic.handle.setMatchRoundStarted(true);
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
        setOriginalLetters([""]);
        setUserWord("");
        setKeyTypedList([]);
    }

    const nextRound = () => {
        if (!settings.state.playerSettings.host) return;

        const nextRountNumber = currentRound + 1;
        gameLogic.handle.setMatchRound(nextRountNumber);
        gameLogic.handle.setMatchRoundStarted(false);
        if (nextRountNumber < settings.state.currentMatch.rounds) {
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
        const keyTyped = currentKey.key;

        const keyTypedListCopy = [...keyTypedList];
        if (keyTypedListCopy.find(key => key === keyTyped))
            return;

        const userLetterCopy: string[] = [...userLetter];
        let correct = false;
        for (let i = 0; i < wordLetters.length; i++) {
            if (keyTyped.toUpperCase() === wordLetters[i].toLocaleUpperCase()) {
                correct = true;
                userLetterCopy[i] = keyTyped.toLocaleUpperCase();
            }
        }

        if (!correct) {
            keyTypedListCopy.push(keyTyped);
            validateError();
        }

        setKeyTypedList(keyTypedListCopy);
        setCompleted(validateComplete(userLetterCopy, wordLetters));
        setUserLetter(userLetterCopy);
    }, [currentKey]);


    const onExternalKeyPress = (key: string) => {
        const normalizedKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        setKey({ key: normalizedKey });
    }

    const keyDownHandler = (event: KeyboardEvent) => {
        const key = event.key || "";
        const normalizedKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        setKey({ key: normalizedKey });
    }

    useEffect(() => {
        window.addEventListener("keydown", (event) => { keyDownHandler(event) });
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    const isFinishGame = (): boolean => {
        return (currentRound + 1) >= settings.state.currentMatch.rounds
    }

    const getButtonText = () => {
        return !settings.state.playerSettings.host ?
        lang.useGameState.waiting_for_host : isFinishGame() ?
        lang.useGameState.exit : lang.useGameState.next_round;
    }


    return {
        state: {
            scoreTable: {
                headers: gameLogic.handle.scoreTableHeaders(),
                rows: gameLogic.handle.scoreTableRows(),
                callBack: nextRound,
                disableButton: false,
                buttonText: getButtonText(),
                timer: {
                    showTimer: true,
                    time: TimesEnum.SCORES_PAGE,
                    callBack: nextRound,
                }
            },
            wordLetters: originalLetters,
            userLetter,
            errors,
            roundStart,
            completed,
            gameOver,
            playersFinish,
            isReady: gameLogic.handle.isPlayerReady(currentRound),
            players: settings.state.players,
            match: settings.state.currentMatch,
            userWord,
            keyTypedList,
        },
        timerMenu: {
            time: TimesEnum.MENU,
            callBack: timerMenuCallback
        },
        timerGame: {
            time: GET_TIME(GAME_KIND.NORMAL, settings.state.gamesConfiguration.global.duration),
            callBack: timerGameCallback
        },
        handle: {
            getPlayerStatus: gameLogic.handle.getPlayerStatus,
            getPlayerName: settings.handle.getPlayerName,
            onExternalKeyPress,
            finishGameCallback,
            changeUserWord,
            startGame,
            nextRound,
        }
    };
}