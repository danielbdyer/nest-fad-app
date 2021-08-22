import { InsurancePlanWhereInput } from "./InsurancePlanWhereInput";
import { InsurancePlanOrderByInput } from "./InsurancePlanOrderByInput";

export type InsurancePlanFindManyArgs = {
  where?: InsurancePlanWhereInput;
  orderBy?: InsurancePlanOrderByInput;
  skip?: number;
  take?: number;
};
