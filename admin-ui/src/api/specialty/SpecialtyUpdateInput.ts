import { ServiceLineWhereUniqueInput } from "../serviceLine/ServiceLineWhereUniqueInput";

export type SpecialtyUpdateInput = {
  serviceLine?: ServiceLineWhereUniqueInput | null;
};
