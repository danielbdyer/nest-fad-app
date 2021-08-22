import { DocAsapSchedulingConfigurationWhereUniqueInput } from "../docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationWhereUniqueInput";
import { ProviderPhotoWhereUniqueInput } from "../providerPhoto/ProviderPhotoWhereUniqueInput";

export type ProviderUpdateInput = {
  acceptingNewPatients?: boolean;
  active?: boolean;
  biography?: string | null;
  chatAvailable?: boolean | null;
  docAsapSchedulingConfiguration?: DocAsapSchedulingConfigurationWhereUniqueInput;
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
