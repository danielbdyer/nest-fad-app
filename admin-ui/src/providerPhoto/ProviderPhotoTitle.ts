import { ProviderPhoto as TProviderPhoto } from "../api/providerPhoto/ProviderPhoto";

export const PROVIDERPHOTO_TITLE_FIELD = "id";

export const ProviderPhotoTitle = (record: TProviderPhoto) => {
  return record.id;
};
