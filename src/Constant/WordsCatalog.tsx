import { LanguageIdEnum } from "./LanguageCatalog";
import { Misscelaneous, Test } from "./WordsCatalogs/es_catalog";

export enum CategoryEnum {
    MISCELLANEOUS = "MISCELLANEOUS",
    TEST = "TEST",
};

export const WORDS_CATALOG = {
    [LanguageIdEnum.ES]: {
        [CategoryEnum.MISCELLANEOUS]: Misscelaneous,
        [CategoryEnum.TEST]: Test,
    },
    [LanguageIdEnum.EN]: {
        [CategoryEnum.MISCELLANEOUS]: Misscelaneous,
        [CategoryEnum.TEST]: Test,
    }
}
