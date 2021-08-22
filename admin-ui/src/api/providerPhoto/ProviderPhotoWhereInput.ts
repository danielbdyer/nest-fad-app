import { StringFilter } from "../../util/StringFilter";
import { ProviderWhereUniqueInput } from "../provider/ProviderWhereUniqueInput";

export type ProviderPhotoWhereInput = {
  id?: StringFilter;
  provider?: ProviderWhereUniqueInput;
};
