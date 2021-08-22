import { Condition } from "../condition/Condition";
import { Provider } from "../provider/Provider";
import { ServiceLine } from "../serviceLine/ServiceLine";

export type Specialty = {
  conditions?: Array<Condition>;
  createdAt: Date;
  id: string;
  providers?: Array<Provider>;
  serviceLine?: ServiceLine | null;
  updatedAt: Date;
};
