import { StringFilter } from "../../util/StringFilter";
import { SpecialtyWhereUniqueInput } from "../specialty/SpecialtyWhereUniqueInput";

export type ConditionWhereInput = {
  name?: StringFilter;
  id?: StringFilter;
  specialty?: SpecialtyWhereUniqueInput;
};
