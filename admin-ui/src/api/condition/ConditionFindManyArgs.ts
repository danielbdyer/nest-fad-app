import { ConditionWhereInput } from "./ConditionWhereInput";
import { ConditionOrderByInput } from "./ConditionOrderByInput";

export type ConditionFindManyArgs = {
  where?: ConditionWhereInput;
  orderBy?: ConditionOrderByInput;
  skip?: number;
  take?: number;
};
