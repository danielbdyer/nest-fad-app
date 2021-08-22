import { Location } from "../location/Location";
import { Specialty } from "../specialty/Specialty";

export type ServiceLine = {
  createdAt: Date;
  id: string;
  locations?: Array<Location>;
  specialties?: Array<Specialty>;
  updatedAt: Date;
};
