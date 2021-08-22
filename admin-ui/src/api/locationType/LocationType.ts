import { Location } from "../location/Location";

export type LocationType = {
  createdAt: Date;
  id: string;
  locations?: Array<Location>;
  name: string;
  updatedAt: Date;
};
