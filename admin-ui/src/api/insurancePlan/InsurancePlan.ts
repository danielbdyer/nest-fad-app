import { InsuranceCarrier } from "../insuranceCarrier/InsuranceCarrier";
import { Provider } from "../provider/Provider";

export type InsurancePlan = {
  createdAt: Date;
  id: string;
  insuranceCarrier?: InsuranceCarrier;
  code: string | null;
  name: string;
  provider?: Array<Provider>;
  updatedAt: Date;
};
