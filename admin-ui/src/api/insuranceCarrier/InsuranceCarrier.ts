import { InsurancePlan } from "../insurancePlan/InsurancePlan";
import { Provider } from "../provider/Provider";

export type InsuranceCarrier = {
  createdAt: Date;
  id: string;
  code: string;
  name: string;
  insurancePlans?: Array<InsurancePlan>;
  provider?: Array<Provider>;
  updatedAt: Date;
};
