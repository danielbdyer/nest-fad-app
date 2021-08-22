import { ServiceLineWhereInput } from "./ServiceLineWhereInput";
import { ServiceLineOrderByInput } from "./ServiceLineOrderByInput";

export type ServiceLineFindManyArgs = {
  where?: ServiceLineWhereInput;
  orderBy?: ServiceLineOrderByInput;
  skip?: number;
  take?: number;
};
