import { LanguageIdEnum } from "./LanguageCatalog";
import { Misscelaneous, Countries, Movies } from "./WordsCatalogs/es_catalog";

export enum CategoryEnum {
    MISCELLANEOUS = "MISCELLANEOUS",
    COUNTRIES = "CONTRIES",
    MOVIES = "MOVIES"
};

export const WORDS_CATALOG = {
    [LanguageIdEnum.ES]: {
        [CategoryEnum.MISCELLANEOUS]: Misscelaneous,
        [CategoryEnum.COUNTRIES]: Countries,
        [CategoryEnum.MOVIES]: Movies,
    },
    [LanguageIdEnum.EN]: {
        [CategoryEnum.MISCELLANEOUS]: Misscelaneous,
        [CategoryEnum.COUNTRIES]: Countries,
        [CategoryEnum.MOVIES]: Movies,
    }
}
