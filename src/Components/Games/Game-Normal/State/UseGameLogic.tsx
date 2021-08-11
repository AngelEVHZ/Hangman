import { useEffect } from "react";
import { useState } from "react";
import { PlayerStatusEnum } from "../../../../Constant/PlayerStatusEnum";
import { StorageEnum } from "../../../../Constant/StorageEnum";
import { useSettings } from "../../../../Context/SettingsProvider";
import { SettingsContextInterface } from "../../../../Context/State/UseSettingsState";
import { GameScore, PlayerScore, PlayerScoreResume, ScoreResume } from "../../../../types/GameNormalTypes";
import { RandomWords, TargetWord } from "../../../../types/GameTypes";
import { UserSession } from "../../../../types/UserSession";

export interface GameLogic {
    handle: {
        setPlayerWord: (roundIndex: number, word: string, playerId?: string,) => void;
        isPlayerReady: (roundIndex: number, playerId?: string) => boolean;
        allPlayerReady: (roundIndex: number) => boolean;
        randomizeWords: (roundIndex: number) => RandomWords;
        setRandomWords: (roundIndex: number, words: RandomWords) => void;
        getPlayerTargetWord: (roundIndex: number, playerId?: string) => string;
        setFinishRound: (roundIndex: number, completed: boolean, time: number, playerId?: string) => void;
        allPlayerFinish: (roundIndex: number) => boolean;
        generateScore: () => ScoreResume;
        setMatchRound: (round: number) => void;
        setMatchRoundStarted: (started: boolean) => void;
        getPlayerStatus: (playerId: string) => PlayerStatusEnum;
    },
    state: {
        scoreResume: ScoreResume;
    }
}


export const useGameLogic = (): GameLogic => {
    const settings: SettingsContextInterface = useSettings();
    const [scoreResume, setScoreResume] = useState<ScoreResume>({ players: [] });
    const [matchRound, setMatchRound] = useState(0);
    const [matchRoundStarted, setMatchRoundStarted] = useState(false);

    useEffect(() => {
        setMatchRoundStarted(false);
        setMatchRound(0);
    }, []);

    const setFinishRound = (roundIndex: number, completed: boolean, time: number, playerId?: string) => {
        if (roundIndex >= settings.state.currentMatch.rounds) return;
        const id = playerId ? playerId : settings.state.playerSettings.playerId;
        const match = { ...settings.state.currentMatch };
        const score = match.score[roundIndex]
        if (!score[id]) return;
        score[id].time = time;
        score[id].finish = true;
        score[id].completed = completed;
        score[id].score = completed ? 1 : 0;
        settings.handle.saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
        settings.handle.setMatch(match);
    }

    const allPlayerFinish = (roundIndex: number): boolean => {
        if (roundIndex >= settings.state.currentMatch.rounds) return false;
        const score = getCurrentScore(roundIndex);
        const match = { ...settings.state.currentMatch };
        const size = match.players.length;
        for (let i = 0; i < size; i++) {
            const player = match.players[i];
            if (!score[player.playerId].finish) return false;
        }
        return true;
    }


    const setPlayerWord = (roundIndex: number, word: string, playerId?: string) => {
        if (roundIndex >= settings.state.currentMatch.rounds) return;
        const id = playerId ? playerId : settings.state.playerSettings.playerId;
        const match = { ...settings.state.currentMatch };
        const score = match.score[roundIndex]
        if (!score[id]) return;
        score[id].originalWord = word;
        score[id].ready = true;
        settings.handle.saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
        settings.handle.setMatch(match);
    }

    const isPlayerReady = (roundIndex: number, playerId?: string) => {
        if (roundIndex >= settings.state.currentMatch.rounds) return false;
        const id = playerId ? playerId : settings.state.playerSettings.playerId;
        const score = getCurrentScore(roundIndex);
        if (!score[id]) return false;
        return score[id].ready;
    }

    const allPlayerReady = (roundIndex: number): boolean => {
        if (roundIndex >= settings.state.currentMatch.rounds) return false;
        const match = { ...settings.state.currentMatch };
        const score = getCurrentScore(roundIndex);
        const size = match.players.length;
        for (let i = 0; i < size; i++) {
            const player = match.players[i];
            if (!score[player.playerId].ready) return false;
        }
        return true;
    }

    const getCurrentScore = (roundIndex: number): GameScore => {
        return settings.state.currentMatch.score[roundIndex]
    }

    const setRandomWords = (roundIndex: number, words: RandomWords) => {
        const match = { ...settings.state.currentMatch };
        const score = match.score[roundIndex]
        match.players.forEach((player: UserSession) => {
            score[player.playerId].targetWord = words[player.playerId].word;
        });
        settings.handle.saveItem(StorageEnum.GAME_MATCH, JSON.stringify(match));
        settings.handle.setMatch(match);
    }

    const getPlayerTargetWord = (roundIndex: number, playerId?: string): string => {
        if (roundIndex >= settings.state.currentMatch.rounds) return "";
        const id = playerId ? playerId : settings.state.playerSettings.playerId;
        const score = getCurrentScore(roundIndex);
        if (!score[id]) return "";
        return score[id].targetWord;
    }

    const randomizeWords = (roundIndex: number): RandomWords => {
        const match = { ...settings.state.currentMatch };
        const score = getCurrentScore(roundIndex);

        let playersInMess: { playerId: string, word: string }[] = [];
        let wordsOrderedRandom: RandomWords = {};

        match.players.forEach((player: UserSession) => {
            if ((Math.floor(Math.random() * 2) + 1) > 1) {
                playersInMess.push({ playerId: player.playerId, word: score[player.playerId].originalWord });

            } else {
                playersInMess.unshift({ playerId: player.playerId, word: score[player.playerId].originalWord });
            }
            wordsOrderedRandom[player.playerId] = { word: score[player.playerId].originalWord } as TargetWord;
        });

        if (match.players.length <= 1) return wordsOrderedRandom;
        const size = match.players.length;
        for (let i = 0; i < size; i++) {
            const currentPlayerId = playersInMess[i].playerId;
            let previewIndex = i - 1;
            if (previewIndex < 0) previewIndex = size - 1;
            const previewPlayerWord = playersInMess[previewIndex].word;
            wordsOrderedRandom[currentPlayerId] = { word: previewPlayerWord } as TargetWord;
        }
        return wordsOrderedRandom;
    }


    const generateScore = (): ScoreResume => {
        const match = { ...settings.state.currentMatch };
        const scoreResume: ScoreResume = {
            players: []
        };

        match.players.forEach((player: UserSession) => {
            const resume: PlayerScoreResume = {
                [player.playerId]: []
            }
            let scoreAcumulated = 0;
            for (let i = 0; i < match.rounds; i++) {
                const score: GameScore = match.score[i];
                const playerScore: PlayerScore = score[player.playerId];
                resume[player.playerId].push(playerScore.score)
                scoreAcumulated += playerScore.score;
            }
            resume[player.playerId].push(scoreAcumulated)
            scoreResume.players.push(resume);
        });

        scoreResume.players = scoreResume.players =
            scoreResume.players.sort((a: PlayerScoreResume, b: PlayerScoreResume) => {
                const keyA = Object.keys(a)[0];
                const keyB = Object.keys(b)[0];
                const size = a[keyA].length;
                return a[keyA][size - 1] > b[keyB][size - 1] ? -1 : 1;
            });

        setScoreResume(scoreResume);
        return scoreResume;
    }


    const getPlayerStatus = (playerId: string): PlayerStatusEnum => {
        if (!settings.state.isPlaying || matchRound >= settings.state.currentMatch.rounds) return PlayerStatusEnum.ON_DASHBOARD;

        const score = getCurrentScore(matchRound);
        const playerScore = score[playerId];
        if (playerScore) {
            if (!matchRoundStarted && !playerScore.ready) return PlayerStatusEnum.WAITING;
            if (!matchRoundStarted && playerScore.ready) return PlayerStatusEnum.READY;
            if (!playerScore.finish) return PlayerStatusEnum.TYPING;
            if (playerScore.completed) return PlayerStatusEnum.SUCCESS;
            else return PlayerStatusEnum.FAIL;
        }
        return PlayerStatusEnum.ON_DASHBOARD;
    }

    return {
        handle: {
            setPlayerWord,
            isPlayerReady,
            allPlayerReady,
            randomizeWords,
            setRandomWords,
            getPlayerTargetWord,
            setFinishRound,
            allPlayerFinish,
            generateScore,
            setMatchRound,
            setMatchRoundStarted,
            getPlayerStatus,
        },
        state: {
            scoreResume,
        }
    };
}