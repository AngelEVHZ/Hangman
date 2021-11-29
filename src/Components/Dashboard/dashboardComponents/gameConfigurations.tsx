import { set } from "lodash";
import React, { useState } from "react";
import { GAME_KIND } from "../../../Constant/GameModesCatalog";
import { CategoryEnum } from "../../../Constant/WordsCatalog";
import { useLanguage } from "../../../Context/LanguageProvider";
import { useSettings } from "../../../Context/SettingsProvider";
import { ATTEMPS, Duration, DURATION_CATALOG, GamesConfiguration, ROUNDS, WORDS_CATEGORY_CATALOG } from "../../../types/GamesConfiguration";
import './gameStyle.css';
import { get } from "lodash";

interface GameConfigurationsProps {

}

const GameConfigurations: React.FC<any> = (props: GameConfigurationsProps) => {
    const { lang } = useLanguage();
    const settings = useSettings();
    const gamesConfiguracion = settings.state.gamesConfiguration;
    const host = settings.state.playerSettings.host;
    const durationText = {
        [Duration.FAST]: "gameConfigurations.general.fast",
        [Duration.NORMAL]: "gameConfigurations.general.normal",
        [Duration.LOW]: "gameConfigurations.general.low",
    };
    const categoryText = {
        [CategoryEnum.MISCELLANEOUS]: "Diverso",
        [CategoryEnum.COUNTRIES]: "Países",
        [CategoryEnum.MOVIES]: "Películas",
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
                            {lang.gameConfigurations.general.title}
                        </p>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <label className="label">{lang.gameConfigurations.general.duration}</label>
                            <p className="help">{lang.gameConfigurations.general.description}</p>
                            <div className="control">
                                <div className="select">
                                    <select defaultValue={gamesConfiguracion.global.duration} onChange={onDurationChange} disabled={!host}>
                                        {DURATION_CATALOG.map(item => (<option value={item} key={item}>{get(lang, durationText[item])}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">{lang.gameConfigurations.general.anonymous_mode}</label>
                            <p className="help">{lang.gameConfigurations.general.description2}</p>
                            <div className="control">
                                <div className="select">
                                    <select  defaultValue={gamesConfiguracion.global.secret_author ? 1 : 0} onChange={onSecretAuthorChange} disabled={!host || true}>
                                        <option value={1}>{lang.gameConfigurations.general.yes}</option>
                                        <option value={0}>{lang.gameConfigurations.general.no}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">{lang.gameConfigurations.general.attempts}</label>
                            <p className="help">{lang.gameConfigurations.general.description3}</p>
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
                            {lang.gameConfigurations.clasic.title}
                        </p>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <label className="label">{lang.gameConfigurations.clasic.rounds}</label>
                            <p className="help">{lang.gameConfigurations.clasic.description}</p>
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
                            {lang.gameConfigurations.vs_reloj.title}
                        </p>
                    </div>
                    <div className="column is-8">
                        <div className="field">
                            <label className="label">{lang.gameConfigurations.vs_reloj.category}</label>
                            <p className="help">{lang.gameConfigurations.vs_reloj.description}</p>
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