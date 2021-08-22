import { StringFilter } from "../../util/StringFilter";
import { InsuranceCarrierWhereUniqueInput } from "../insuranceCarrier/InsuranceCarrierWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type InsurancePlanWhereInput = {
  id?: StringFilter;
  insuranceCarrier?: InsuranceCarrierWhereUniqueInput;
  code?: StringNullableFilter;
  name?: StringFilter;
};
