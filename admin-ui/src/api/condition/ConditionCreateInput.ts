import { SpecialtyWhereUniqueInput } from "../specialty/SpecialtyWhereUniqueInput";

export type ConditionCreateInput = {
  name: string;
  specialty: SpecialtyWhereUniqueInput;
};
