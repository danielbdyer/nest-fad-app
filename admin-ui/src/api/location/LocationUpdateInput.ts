import { LocationTypeWhereUniqueInput } from "../locationType/LocationTypeWhereUniqueInput";

export type LocationUpdateInput = {
  addressLine_1?: string;
  addressLine_2?: string | null;
  city?: string | null;
  friday?: Date | null;
  locationType?: LocationTypeWhereUniqueInput | null;
  monday?: Date | null;
  saturday?: Date | null;
  state?: string | null;
  sunday?: Date | null;
  thursday?: Date | null;
  tuesday?: Date | null;
  wednesday?: Date | null;
  zip?: string | null;
};
