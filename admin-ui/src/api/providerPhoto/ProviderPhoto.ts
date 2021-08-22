import { Provider } from "../provider/Provider";

export type ProviderPhoto = {
  createdAt: Date;
  id: string;
  provider?: Provider | null;
  updatedAt: Date;
};
