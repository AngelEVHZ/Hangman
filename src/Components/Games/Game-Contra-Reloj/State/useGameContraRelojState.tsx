import { get } from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NotifyActionEnum, NotifyGameActionEnum } from "../../../../Constant/NotifyActionEnum";
import { PlayerStatusEnum } from "../../../../Constant/PlayerStatusEnum";
import { Routes } from "../../../../Constant/RoutesEnum";
import { SocketActionEnum } from "../../../../Constant/SocketActionEnum";
import { TimesEnum } from "../../../../Constant/Times";
import { useSettings } from "../../../../Context/SettingsProvider";
import { useSocket } from "../../../../Context/SocketProvider";
import { NotifyEndMatch, NotifyReady, NotifyWordList, WordPlayed } from "../../../../types/GameContraRelojTypes";
import { GenericNotify, NotifyAll, SocketAction } from "../../../../types/SocketAction";
import { UserSession } from "../../../../types/UserSession";
import { ScoreTableProps } from "../../../Commonds/ScoreTable/ScoreTable";
import { useCommondLogic } from "../../Commond-Logic/useCommondLogic";
import { useHangmanLogic } from "../../Hangman-Logic/useHangmanLogic";
import { useGameContraRelojLogic } from "./useGameContraRelogLogic";


export interface GameContraRelojProps {
    handle: {
        imReadyToStart: () => void;
        onFinishHangmanRound: () => void;
        onTimeCallBack: () => void;
        getPlayerStatus: (playerId: string) => PlayerStatusEnum;
    },
    state: {
        isPlayerReadyToStart: boolean;
        timeMenu: number;
        wordLetters: string[],
        userLetter: Array<string>;
        errors: boolean[],
        keyTypedList: string[];
        isGameStarted: boolean;
        wordGameOver: boolean;
        wordCompleted: boolean;
        showInputLetters: boolean;
        isGameCompleted: boolean;
        gameTime: number;
        stopTimer: boolean;
        players: UserSession[];
        scoreTable: ScoreTableProps;
    }
}


export const UseGameContraRelojState = (): GameContraRelojProps => {
    const gameLogic = useGameContraRelojLogic();
    const history = useHistory();
    const settings = useSettings();
    const socket = useSocket();
    useCommondLogic();

    const [showInputLetters, setShowInputLetters] = useState<boolean>(false);
    //GAME STATUS
    const [isPlayerReadyToStart, setIsPlayerReadyToStart] = useState<boolean>(false);
    const [isGameSendedToPlayers, setIsGameSendedToPlayers] = useState<boolean>(false);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);
    const [stopTimer, setStopTimer] = useState<boolean>(false);

    //GAME CONTROL
    const [wordIndex, setWordIndex] = useState(0);
    const [wordGameOver, setWordGameOver] = useState<boolean>(false);
    const [wordCompleted, setWordCompleted] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);

    const hangman = useHangmanLogic({
        start: isGameStarted && !wordGameOver && !wordCompleted && !isGameCompleted,
        setGameover: setWordGameOver,
        setCompleted: setWordCompleted,
    });

    useEffect(() => {
        if (!socket.state.message) return;
        const message = socket.state.message;
        if (message.action == NotifyActionEnum.NOTIFY_ALL) {
            const action = get(message, "data.action", "");
            switch (action) {
                case NotifyGameActionEnum.PLAYER_IS_READY:
                    const notifyPlayerReady: NotifyReady = message.data as NotifyReady;
                    gameLogic.handle.setPlayerIsReady(notifyPlayerReady.playerId);
                    break;
                case NotifyGameActionEnum.SET_GAME_SETTINGS:
                    const notifyWordList: NotifyWordList = message.data as NotifyWordList;
                    gameLogic.handle.setWordList(notifyWordList.wordList);
                    break;
                case NotifyGameActionEnum.END_MATCH:
                    const notifyEndMatch: NotifyEndMatch = message.data as NotifyEndMatch;
                    gameLogic.handle.fillPlayerScore(notifyEndMatch);
                    break;
                case NotifyGameActionEnum.GO_TO:
                    history.push(Routes.DASHBOARD);
                    break;
            }
        }

    }, [socket.state.message]);


    useEffect(() => {
        if (!wordGameOver && !wordCompleted) return;
        const duration = wordCompleted ? TimesEnum.NEXT_WORD : TimesEnum.ON_FAIL_WORD;
        setTimeout(() => {
            setShowInputLetters(false);
            setTimeout(function () {
                endWord();
            }, TimesEnum.SHORT_TIME);
        }, duration);
    }, [wordGameOver, wordCompleted]);


    useEffect(() => {
        if (!settings.state.playerSettings.host) return;

        if (!isGameSendedToPlayers) {
            const allPlayerReady = gameLogic.handle.areAllPlayersReadyToStart();
            if (allPlayerReady) {
                setIsGameSendedToPlayers(true);
                generateWordsAndNotiy();

            }
        }
    });

    useEffect(() => {
        if (!isGameStarted && settings.state.contraRelojMatch.wordList.length > 0) {
            startGame();
        }

    }, [settings.state.contraRelojMatch]);

    useEffect(() => {
        if (!isGameCompleted) return;

        notifyGameCompleted();

    }, [isGameCompleted]);

    const notifyGameCompleted = () => {
        const playerId = settings.state.playerSettings.playerId;
        const playerScore = gameLogic.handle.getPlayerScore(playerId);
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: true,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    playerId: playerId,
                    wordsPlayedZip: playerScore.wordsPlayedZip,
                    successWords: playerScore.successWords,
                    failWords: playerScore.failWords,
                    action: NotifyGameActionEnum.END_MATCH,
                    finish: true,
                } as NotifyEndMatch
            }
        }
        socket.actions.notify(data);
    }


    const startGame = () => {
        nextWord();
        setStartDate(new Date());
        setIsGameStarted(true);
    }

    const endGame = () => {
        gameLogic.handle.setPlayerScoreFinish(settings.state.playerSettings.playerId, true);
        setIsGameCompleted(true);
    }

    const onFinishHangmanRound = () => {
        if (!isNextWordAvailable()) {
            setStopTimer(true);
        }
    }

    const endWord = () => {
        const wordPlayed: WordPlayed = {
            wordId: wordIndex,
            word: hangman.state.word,
            success: wordCompleted,
        }
        gameLogic.handle.setPlayerScore(settings.state.playerSettings.playerId, wordPlayed);

        setWordGameOver(false);
        setWordCompleted(false);
        nextWord(true);
    }

    const isNextWordAvailable = () => {
        const index = (wordIndex + 1);
        const totalWords = settings.state.contraRelojMatch.wordList.length;
        return index < totalWords;
    }

    const nextWord = (nextIndex?: boolean) => {
        if (isGameCompleted) return;
        const index = !nextIndex ? wordIndex : (wordIndex + 1);

        setWordIndex(index);
        setWordGameOver(false);
        setWordCompleted(false);
        if (isNextWordAvailable()) {
            const wordId = gameLogic.handle.getWordListElement(index);
            const word = settings.handle.getWordById(wordId);
            const originalWord = word.toLocaleUpperCase();
            hangman.handle.setWord(originalWord);
            setShowInputLetters(true);
        } else {
            endGame();
        }
    }

    const generateWordsAndNotiy = () => {
        const wordList = gameLogic.handle.generateWordList();
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    wordList,
                    action: NotifyGameActionEnum.SET_GAME_SETTINGS
                } as NotifyWordList
            }
        }
        gameLogic.handle.setPlayerIsReady(settings.state.playerSettings.playerId);
        socket.actions.notify(data);
    }

    const imReadyToStart = () => {
        if (isPlayerReadyToStart) return;
        setIsPlayerReadyToStart(true);
        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                excludeOwner: true,
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    playerId: settings.state.playerSettings.playerId,
                    action: NotifyGameActionEnum.PLAYER_IS_READY
                } as NotifyReady
            }
        }
        gameLogic.handle.setPlayerIsReady(settings.state.playerSettings.playerId);
        socket.actions.notify(data);
    }

    const onTimeCallBack = () => {
        endGame();
    }

    const getButtonText = () => {
        if (!settings.state.playerSettings.host ||
            !gameLogic.handle.areAllPlayersReadyToEnd())
            return "Waiting For Players";
        return "Salir!";
    }

    const buttonGoDashboard = () => {
        if (!settings.state.playerSettings.host ||
            !gameLogic.handle.areAllPlayersReadyToEnd())
            return;

        const data: SocketAction<NotifyAll> = {
            action: SocketActionEnum.NOTIFY_ALL,
            data: {
                gameId: settings.state.playerSettings.gameId,
                notification: {
                    action: NotifyGameActionEnum.GO_TO
                } as GenericNotify,
            }
        }
        socket.actions.notify(data);
    }

    return {
        handle: {
            imReadyToStart,
            onFinishHangmanRound,
            onTimeCallBack,
            getPlayerStatus: gameLogic.handle.getPlayerStatus,
        },
        state: {
            isPlayerReadyToStart,
            timeMenu: TimesEnum.MENU,
            gameTime: TimesEnum.PLAYING,
            wordLetters: hangman.state.originalLetters,
            userLetter: hangman.state.userLetter,
            errors: hangman.state.errors,
            keyTypedList: hangman.state.keyTypedList,
            players: settings.state.players,
            isGameStarted,
            wordGameOver,
            wordCompleted,
            showInputLetters,
            isGameCompleted,
            stopTimer,
            scoreTable: {
                headers: gameLogic.handle.scoreTableHeaders(),
                rows: gameLogic.handle.scoreTableRows(),
                callBack: buttonGoDashboard,
                disableButton: false,
                buttonText: getButtonText(),
                timer: {
                    showTimer: false,
                    time: 10,
                    callBack: () => { },
                }
            },
        }
    };
}