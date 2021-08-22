import { SortOrder } from "../../util/SortOrder";

export type InsurancePlanOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  insuranceCarrierId?: SortOrder;
  code?: SortOrder;
  name?: SortOrder;
  updatedAt?: SortOrder;
};
