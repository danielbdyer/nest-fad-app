import { SpecialtyWhereUniqueInput } from "../specialty/SpecialtyWhereUniqueInput";

export type ConditionUpdateInput = {
  name?: string;
  specialty?: SpecialtyWhereUniqueInput;
};
