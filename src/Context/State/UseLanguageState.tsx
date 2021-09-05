import es from "../../Constant/Lang/es.json";
import en from "../../Constant/Lang/en.json";
export interface LanguageContextInterface {
  lang: any;
}

export const UseLanguageState = (): LanguageContextInterface => {

  return {
      lang: es
  }
}