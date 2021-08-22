import { SortOrder } from "../../util/SortOrder";

export type ConditionOrderByInput = {
  name?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  specialtyId?: SortOrder;
  updatedAt?: SortOrder;
};
