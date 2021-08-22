import { Provider as TProvider } from "../api/provider/Provider";

export const PROVIDER_TITLE_FIELD = "videoUrl";

export const ProviderTitle = (record: TProvider) => {
  return record.videoUrl;
};
