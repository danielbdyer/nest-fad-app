import { InsurancePlan as TInsurancePlan } from "../api/insurancePlan/InsurancePlan";

export const INSURANCEPLAN_TITLE_FIELD = "name";

export const InsurancePlanTitle = (record: TInsurancePlan) => {
  return record.name;
};
