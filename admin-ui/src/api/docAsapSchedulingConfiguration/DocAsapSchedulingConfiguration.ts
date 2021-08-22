import { Provider } from "../provider/Provider";

export type DocAsapSchedulingConfiguration = {
  createdAt: Date;
  docAsapId: string;
  id: string;
  provider?: Provider;
  updatedAt: Date;
};
