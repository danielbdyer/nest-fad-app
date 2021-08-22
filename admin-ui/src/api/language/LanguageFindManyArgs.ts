import { LanguageWhereInput } from "./LanguageWhereInput";
import { LanguageOrderByInput } from "./LanguageOrderByInput";

export type LanguageFindManyArgs = {
  where?: LanguageWhereInput;
  orderBy?: LanguageOrderByInput;
  skip?: number;
  take?: number;
};
