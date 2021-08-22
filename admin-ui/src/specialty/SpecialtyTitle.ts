import { Specialty as TSpecialty } from "../api/specialty/Specialty";

export const SPECIALTY_TITLE_FIELD = "id";

export const SpecialtyTitle = (record: TSpecialty) => {
  return record.id;
};
