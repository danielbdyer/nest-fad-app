import { InsuranceCarrierWhereUniqueInput } from "../insuranceCarrier/InsuranceCarrierWhereUniqueInput";

export type InsurancePlanCreateInput = {
  insuranceCarrier: InsuranceCarrierWhereUniqueInput;
  code?: string | null;
  name: string;
};
