import { Condition as TCondition } from "../api/condition/Condition";

export const CONDITION_TITLE_FIELD = "name";

export const ConditionTitle = (record: TCondition) => {
  return record.name;
};
