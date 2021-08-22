import { StringFilter } from "../../util/StringFilter";
import { ServiceLineWhereUniqueInput } from "../serviceLine/ServiceLineWhereUniqueInput";

export type SpecialtyWhereInput = {
  id?: StringFilter;
  serviceLine?: ServiceLineWhereUniqueInput;
};
