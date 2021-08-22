import { ProviderType as TProviderType } from "../api/providerType/ProviderType";

export const PROVIDERTYPE_TITLE_FIELD = "name";

export const ProviderTypeTitle = (record: TProviderType) => {
  return record.name;
};
