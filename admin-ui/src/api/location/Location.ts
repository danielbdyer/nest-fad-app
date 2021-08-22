import { LocationType } from "../locationType/LocationType";
import { Provider } from "../provider/Provider";
import { ServiceLine } from "../serviceLine/ServiceLine";

export type Location = {
  addressLine_1: string;
  addressLine_2: string | null;
  city: string | null;
  createdAt: Date;
  friday: Date | null;
  id: string;
  locationType?: LocationType | null;
  monday: Date | null;
  provider?: Array<Provider>;
  saturday: Date | null;
  serviceLine?: Array<ServiceLine>;
  state: string | null;
  sunday: Date | null;
  thursday: Date | null;
  tuesday: Date | null;
  updatedAt: Date;
  wednesday: Date | null;
  zip: string | null;
};
