import { DocAsapSchedulingConfigurationWhereUniqueInput } from "../docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationWhereUniqueInput";
import { ProviderPhotoWhereUniqueInput } from "../providerPhoto/ProviderPhotoWhereUniqueInput";

export type ProviderCreateInput = {
  acceptingNewPatients: boolean;
  active: boolean;
  biography?: string | null;
  chatAvailable?: boolean | null;
  docAsapSchedulingConfiguration?: DocAsapSchedulingConfigurationWhereUniqueInput | null;
  email?: string | null;
  employed?: boolean | null;
  epicReference?: number | null;
  gender?: "M" | null;
  onlineAppointments?: boolean | null;
  providerPhotos?: ProviderPhotoWhereUniqueInput;
  videoUrl?: string | null;
  virtualVisits?: boolean | null;
  website?: string | null;
};
