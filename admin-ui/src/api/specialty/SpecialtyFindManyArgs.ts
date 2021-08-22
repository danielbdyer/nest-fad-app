import { SpecialtyWhereInput } from "./SpecialtyWhereInput";
import { SpecialtyOrderByInput } from "./SpecialtyOrderByInput";

export type SpecialtyFindManyArgs = {
  where?: SpecialtyWhereInput;
  orderBy?: SpecialtyOrderByInput;
  skip?: number;
  take?: number;
};
