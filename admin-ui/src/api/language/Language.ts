import { Provider } from "../provider/Provider";

export type Language = {
  createdAt: Date;
  id: string;
  name: string;
  provider?: Array<Provider>;
  updatedAt: Date;
};
