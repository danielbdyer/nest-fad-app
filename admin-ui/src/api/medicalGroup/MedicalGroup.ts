import { Provider } from "../provider/Provider";

export type MedicalGroup = {
  createdAt: Date;
  id: string;
  name: string;
  provider?: Array<Provider>;
  updatedAt: Date;
};
