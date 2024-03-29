import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PlayerStatusEnum } from "../../../../Constant/PlayerStatusEnum";
import { StorageEnum } from "../../../../Constant/StorageEnum";
import { randomShuffle } from "../../../../Constant/UtilsConstants";
import { useSettings } from "../../../../Context/SettingsProvider";
import { GameContraRelojPlayer, NotifyEndMatch, WordPlayed } from "../../../../types/GameContraRelojTypes";

import { faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export interface GameContraRelojLogic {
    handle: {
        setPlayerIsReady: (playerId: string) => void;
        areAllPlayersReadyToStart: () => boolean;
        generateWordList: () => string;
        setWordList: (wordList: string) => void;
        setPlayerScore: (playerId: string, wordPlayed: WordPlayed) => void;
        fillPlayerScore: (data: NotifyEndMatch) => void;
        getWordListElement: (index: number) => number;
        getPlayerScore: (playerId: string) => GameContraRelojPlayer;
        getPlayerStatus: (playerId: string) => PlayerStatusEnum;
        scoreTableHeaders: () => string[];
        scoreTableRows: () => { items: any[] }[];
        areAllPlayersReadyToEnd: () => boolean;
        setPlayerScoreFinish: (playerId: string, finish: boolean) => void;
        setIsGameStarted: (value: boolean) => void;
    },
    state: {
        isGameStarted: boolean;
    }
}

export const useGameContraRelojLogic = (): GameContraRelojLogic => {
    const settings = useSettings();
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    const setPlayerIsReady = (playerId: string) => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        if (contraRelojMatch.score[playerId])
            contraRelojMatch.score[playerId].ready = true;
    }

    const areAllPlayersReadyToStart = () => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        const players = [...settings.state.matchPlayers];
        const size = players.length;
        for (let i = 0; i < size; i++) {
            const player = players[i];
            if (!contraRelojMatch.score[player.playerId].ready) return false;
        }
        return true;
    }

    const areAllPlayersReadyToEnd = (): boolean => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        const players = [...settings.state.matchPlayers];
        const size = players.length;
        for (let i = 0; i < size; i++) {
            const player = players[i];
            if (!contraRelojMatch.score[player.playerId].finish) return false;
        }
        return true;
    }


    const generateWordList = () => {
        const wordsCatalogSize = settings.handle.getWordCatalogSize();
        const numberOfWords = wordsCatalogSize < 60 ? wordsCatalogSize : 60;
        const jumps = Math.floor(wordsCatalogSize / numberOfWords);
        let from = 0;
        let to = jumps - 1;
        let indexArray = [];
        for (let i = 0; i < numberOfWords; i++) {
            const wordIndex = settings.handle.getRandomNumber(to, from);
            indexArray.push(wordIndex);
            from += jumps;
            to += jumps;
        }
        const indexArrayRandom = randomShuffle(indexArray);
        const wordList = indexArrayRandom.join(",");
        return wordList;
    }


    const setWordList = (wordList: string) => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        contraRelojMatch.wordList = wordList.split(",");
        updateMatch(contraRelojMatch);
    }

    const getWordListElement = (index: number) => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        const element = contraRelojMatch.wordList[index]
        return Number(element);
    }

    const setPlayerScore = (playerId: string, wordPlayed: WordPlayed) => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        if (!contraRelojMatch.score[playerId]) return;
        const playerScore = contraRelojMatch.score[playerId];

        playerScore.wordsPlayed.push(wordPlayed);
        if (wordPlayed.success) {
            playerScore.successWords += 1;
            playerScore.wordsPlayedZip += "1,";
        } else {
            playerScore.failWords += 1;
            playerScore.wordsPlayedZip += "0,";
        }
        updateMatch(contraRelojMatch);
    }

    const setPlayerScoreFinish = (playerId: string, finish: boolean) => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        if (!contraRelojMatch.score[playerId]) return;
        const playerScore = contraRelojMatch.score[playerId];
        playerScore.finish = finish;
    }

    const fillPlayerScore = (data: NotifyEndMatch) => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        if (data.wordsPlayedZip.length <= 0 || !contraRelojMatch.score[data.playerId]) return;

        const playerScore = contraRelojMatch.score[data.playerId];
        playerScore.successWords = data.successWords;
        playerScore.failWords = data.failWords;
        playerScore.wordsPlayedZip = data.wordsPlayedZip;
        playerScore.finish = data.finish;
        updateMatch(contraRelojMatch);
    }

    const getPlayerScore = (playerId: string): GameContraRelojPlayer => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        if (!contraRelojMatch.score[playerId])
            return {
                ready: false,
                successWords: 0,
                failWords: 0,
                wordsPlayed: [],
                wordsPlayedZip: "",
                finish: false,
            };
        return contraRelojMatch.score[playerId];

    }

    const updateMatch = (match: any) => {
        settings.handle.saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
        settings.handle.setContraRelojMatch(match);
    }

    const getPlayerStatus = (playerId: string): PlayerStatusEnum => {
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        if (!contraRelojMatch.score[playerId]) return PlayerStatusEnum.WAITING;
        const playerScore = contraRelojMatch.score[playerId];
        if (playerScore.ready && !isGameStarted)
            return PlayerStatusEnum.READY;
        if (playerScore.ready && !playerScore.finish)
            return PlayerStatusEnum.TYPING;
        return PlayerStatusEnum.WAITING;
    }

    const scoreTableHeaders = () => {
        let headers: string[] = ["Word"];
        const players = [...settings.state.matchPlayers];
        players.forEach((player) => {
            headers.push(player.nickName);
        });
        return headers;
    }

    const scoreTableRows = () => {
        let rows: any[] = [];
        const contraRelojMatch = { ...settings.state.contraRelojMatch };
        const score = contraRelojMatch.score;
        const players = [...settings.state.matchPlayers];
        let maxWords = 0;
        const playersZipList: any[] = [];
        players.forEach((player) => {
            playersZipList.push(score[player.playerId].wordsPlayedZip.split(","));
            const playerToltalWords = score[player.playerId].failWords + score[player.playerId].successWords;
            if (maxWords < playerToltalWords) maxWords = playerToltalWords;
        });
        for (let i = 0; i < maxWords; i++) {
            let row: { items: any[] } = { items: [] };
            const wordId = getWordListElement(i);
            const word = settings.handle.getWordById(wordId);
            row.items.push(word.toUpperCase());
            players.forEach((player, index) => {
                let msj: any = (<></>);
                if (playersZipList[index][i]) {
                    msj = playersZipList[index][i] == "1" ? 
                    (<FontAwesomeIcon className="icon m-0 icon-green" icon={faCheckCircle} />) : 
                    (<FontAwesomeIcon className="icon m-0 icon-red" icon={faTimesCircle} />);
                }
                row.items.push(msj);
            });
            rows.push(row);
        }
        return rows;
    }

    return {
        handle: {
            areAllPlayersReadyToEnd,
            setPlayerScoreFinish,
            scoreTableHeaders,
            scoreTableRows,
            getPlayerScore,
            setPlayerIsReady,
            areAllPlayersReadyToStart,
            generateWordList,
            setWordList,
            setPlayerScore,
            fillPlayerScore,
            getWordListElement,
            getPlayerStatus,
            setIsGameStarted,
        },
        state: {
            isGameStarted,
        }
    };
}