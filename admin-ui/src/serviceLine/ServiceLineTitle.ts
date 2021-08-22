import { ServiceLine as TServiceLine } from "../api/serviceLine/ServiceLine";

export const SERVICELINE_TITLE_FIELD = "id";

export const ServiceLineTitle = (record: TServiceLine) => {
  return record.id;
};
