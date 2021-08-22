import { ServiceLineWhereUniqueInput } from "../serviceLine/ServiceLineWhereUniqueInput";

export type SpecialtyCreateInput = {
  serviceLine?: ServiceLineWhereUniqueInput | null;
};
