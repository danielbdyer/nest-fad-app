import { MedicalGroupWhereInput } from "./MedicalGroupWhereInput";
import { MedicalGroupOrderByInput } from "./MedicalGroupOrderByInput";

export type MedicalGroupFindManyArgs = {
  where?: MedicalGroupWhereInput;
  orderBy?: MedicalGroupOrderByInput;
  skip?: number;
  take?: number;
};
