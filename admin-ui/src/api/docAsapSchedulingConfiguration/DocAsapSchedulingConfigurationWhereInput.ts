import { StringFilter } from "../../util/StringFilter";
import { ProviderWhereUniqueInput } from "../provider/ProviderWhereUniqueInput";

export type DocAsapSchedulingConfigurationWhereInput = {
  docAsapId?: StringFilter;
  id?: StringFilter;
  provider?: ProviderWhereUniqueInput;
};
