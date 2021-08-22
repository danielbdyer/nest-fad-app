import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { LocationTypeWhereUniqueInput } from "../locationType/LocationTypeWhereUniqueInput";

export type LocationWhereInput = {
  addressLine_1?: StringFilter;
  addressLine_2?: StringNullableFilter;
  city?: StringNullableFilter;
  friday?: DateTimeNullableFilter;
  id?: StringFilter;
  locationType?: LocationTypeWhereUniqueInput;
  monday?: DateTimeNullableFilter;
  saturday?: DateTimeNullableFilter;
  state?: StringNullableFilter;
  sunday?: DateTimeNullableFilter;
  thursday?: DateTimeNullableFilter;
  tuesday?: DateTimeNullableFilter;
  wednesday?: DateTimeNullableFilter;
  zip?: StringNullableFilter;
};
