import { LocationType as TLocationType } from "../api/locationType/LocationType";

export const LOCATIONTYPE_TITLE_FIELD = "name";

export const LocationTypeTitle = (record: TLocationType) => {
  return record.name;
};
