import React from "react";
import { LanguageIdEnum } from "../../../Constant/LanguageCatalog";
import { useLanguage } from "../../../Context/LanguageProvider";
import { useUtils } from "../../../Context/UtilsProvider";
import "./Header.css";

const Header: React.FC<any> = () => {
    const utils = useUtils();
    const { changeLanguage } = useLanguage();
    const classHide = utils.state.showHeader ? "" : "hide";
    return (
        <div className={classHide}>
            {
                <nav className="navbar header p-3 is-mobile" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <h1 className="title is-1 white-title">Hangman The Game</h1>
                        </a>
                    </div>
                    <div className="navbar-end is-hidden-mobile">
                        <div className="navbar-item">
                            <nav className="breadcrumb" aria-label="breadcrumbs">
                                <ul>
                                    <li><a className="white-title" onClick={() => { changeLanguage(LanguageIdEnum.ES) }}>ES</a></li>
                                    <li><a className="white-title" onClick={() => { changeLanguage(LanguageIdEnum.EN) }}>EN</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </nav>
            }
        </div>
    );
};
export default Header;