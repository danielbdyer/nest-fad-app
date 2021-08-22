import { BooleanFilter } from "../../util/BooleanFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { DocAsapSchedulingConfigurationWhereUniqueInput } from "../docAsapSchedulingConfiguration/DocAsapSchedulingConfigurationWhereUniqueInput";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { ProviderPhotoWhereUniqueInput } from "../providerPhoto/ProviderPhotoWhereUniqueInput";

export type ProviderWhereInput = {
  acceptingNewPatients?: BooleanFilter;
  active?: BooleanFilter;
  biography?: StringNullableFilter;
  chatAvailable?: BooleanNullableFilter;
  docAsapSchedulingConfiguration?: DocAsapSchedulingConfigurationWhereUniqueInput;
  email?: StringNullableFilter;
  employed?: BooleanNullableFilter;
  epicReference?: IntNullableFilter;
  gender?: "M";
  id?: StringFilter;
  onlineAppointments?: BooleanNullableFilter;
  providerPhotos?: ProviderPhotoWhereUniqueInput;
  videoUrl?: StringNullableFilter;
  virtualVisits?: BooleanNullableFilter;
  website?: StringNullableFilter;
};
