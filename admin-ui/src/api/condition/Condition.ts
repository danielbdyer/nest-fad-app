import { Provider } from "../provider/Provider";
import { Specialty } from "../specialty/Specialty";

export type Condition = {
  name: string;
  createdAt: Date;
  id: string;
  provider?: Array<Provider>;
  specialty?: Specialty;
  updatedAt: Date;
};
