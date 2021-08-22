import { Location as TLocation } from "../api/location/Location";

export const LOCATION_TITLE_FIELD = "addressLine_1";

export const LocationTitle = (record: TLocation) => {
  return record.addressLine_1;
};
