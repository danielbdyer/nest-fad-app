import { MedicalGroup as TMedicalGroup } from "../api/medicalGroup/MedicalGroup";

export const MEDICALGROUP_TITLE_FIELD = "name";

export const MedicalGroupTitle = (record: TMedicalGroup) => {
  return record.name;
};
