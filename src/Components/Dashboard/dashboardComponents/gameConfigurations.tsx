import { set } from "lodash";
import React, { useState } from "react";
import { GAME_KIND } from "../../../Constant/GameModesCatalog";
import { useSettings } from "../../../Context/SettingsProvider";
import { Duration, DURATION_CATALOG, GamesConfiguration, ROUNDS } from "../../../types/GamesConfiguration";
import './gameStyle.css';

interface GameConfigurationsProps {

}

const GameConfigurations: React.FC<any> = (props: GameConfigurationsProps) => {
    const settings = useSettings();
    const gamesConfiguracion = settings.state.gamesConfiguration;
    const host = settings.state.playerSettings.host;
    const durationText= {
        [Duration.FAST]: "Rapido",
        [Duration.NORMAL]: "Normal",
        [Duration.LOW]: "Lento",
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
            </div>
        </div>
    );
};
export default GameConfigurations;