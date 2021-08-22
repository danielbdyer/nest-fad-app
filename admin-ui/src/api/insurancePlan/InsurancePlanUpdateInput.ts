import { InsuranceCarrierWhereUniqueInput } from "../insuranceCarrier/InsuranceCarrierWhereUniqueInput";

export type InsurancePlanUpdateInput = {
  insuranceCarrier?: InsuranceCarrierWhereUniqueInput;
  code?: string | null;
  name?: string;
};
