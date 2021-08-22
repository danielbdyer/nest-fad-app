import { InsuranceCarrier as TInsuranceCarrier } from "../api/insuranceCarrier/InsuranceCarrier";

export const INSURANCECARRIER_TITLE_FIELD = "name";

export const InsuranceCarrierTitle = (record: TInsuranceCarrier) => {
  return record.name;
};
