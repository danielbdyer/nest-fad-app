import { Provider } from "../provider/Provider";

export type ProviderType = {
  createdAt: Date;
  id: string;
  provider?: Array<Provider>;
  name: string;
  updatedAt: Date;
};
