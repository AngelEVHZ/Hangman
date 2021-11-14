import { set } from "lodash";
import React, { useState } from "react";
import { GAME_KIND } from "../../../Constant/GameModesCatalog";
import { CategoryEnum } from "../../../Constant/WordsCatalog";
import { useSettings } from "../../../Context/SettingsProvider";
import { ATTEMPS, Duration, DURATION_CATALOG, GamesConfiguration, ROUNDS, WORDS_CATEGORY_CATALOG } from "../../../types/GamesConfiguration";
import './gameStyle.css';

interface GameConfigurationsProps {

}

const GameConfigurations: React.FC<any> = (props: GameConfigurationsProps) => {
    const settings = useSettings();
    const gamesConfiguracion = settings.state.gamesConfiguration;
    const host = settings.state.playerSettings.host;
    const durationText = {
        [Duration.FAST]: "Rapido",
        [Duration.NORMAL]: "Normal",
        [Duration.LOW]: "Lento",
    };
    const categoryText = {
        [CategoryEnum.MISCELLANEOUS]: "Diverso",
        [CategoryEnum.TEST]: "test",
    };

    const setValue = (path: string, value: any) => {
        if (!host) return;
        const local = { ...gamesConfiguracion };
        set(local, path, value);
        settings.handle.updateGamesConfiguration(local);
    }
    const onDurationChange = (event: any) => {
        setValue("global.duration", event.target.value);
    }
    const onSecretAuthorChange = (event: any) => {
        setValue("global.secret_author", Number(event.target.value) > 0 ? true : false);
    }
    const onRoundChange = (event: any) => {
        setValue(`${GAME_KIND.NORMAL}.rounds`, Number(event.target.value));
    }
    const onAttempChange = (event: any) => {
        setValue(`global.attempts`, Number(event.target.value));
    }
    const onCategoryChange = (event: any) => {
        setValue(`${GAME_KIND.CONTRA_RELOJ}.category`, event.target.value);
    }

    return (
        <div>
            <div className="content has-text-left">
                <div className="columns ">
                    <div className="column is-4">
                        <p className="subtitle ">
                            General
                        </p>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <label className="label">Duración</label>
                            <p className="help">Tiempo para poder adivinar cada palabra</p>
                            <div className="control">
                                <div className="select">
                                    <select defaultValue={gamesConfiguracion.global.duration} onChange={onDurationChange} disabled={!host}>
                                        {DURATION_CATALOG.map(item => (<option value={item} key={item}>{durationText[item]}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Secretismo</label>
                            <p className="help">Mantener en secreto los autores de las palabras</p>
                            <div className="control">
                                <div className="select">
                                    <select defaultValue={gamesConfiguracion.global.secret_author ? 1 : 0} onChange={onSecretAuthorChange} disabled={!host}>
                                        <option value={1}>Yes</option>
                                        <option value={0}>No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Intentos</label>
                            <p className="help">Numero de intentos para acertar</p>
                            <div className="control">
                                <div className="select">
                                    <select defaultValue={gamesConfiguracion.global.attempts} onChange={onAttempChange} disabled={!host}>
                                        {ATTEMPS.map(value => (<option value={value} key={`attemp-${value}`}>{value}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-4">
                        <p className="subtitle ">
                            Clasico
                        </p>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <label className="label">Rondas</label>
                            <p className="help">Numero de rondas en modo clasico</p>
                            <div className="control">
                                <div className="select">
                                    <select defaultValue={gamesConfiguracion[GAME_KIND.NORMAL].rounds} onChange={onRoundChange} disabled={!host}>
                                        {ROUNDS.map(round => (<option value={round} key={`round-${round}`}>{round}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-4">
                        <p className="subtitle ">
                            Contra Reloj
                        </p>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <label className="label">Categoria</label>
                            <p className="help">Categoria de palabras que podran aparecer en la partida</p>
                            <div className="control">
                                <div className="select">
                                    <select defaultValue={gamesConfiguracion[GAME_KIND.CONTRA_RELOJ].category} onChange={onCategoryChange} disabled={!host}>
                                        {WORDS_CATEGORY_CATALOG.map(value => (<option value={value} key={`category-${value}`}>{categoryText[value]}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GameConfigurations;