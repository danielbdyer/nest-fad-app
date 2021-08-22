import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderPhotoWhereUniqueInput } from "./ProviderPhotoWhereUniqueInput";
import { ProviderPhotoUpdateInput } from "./ProviderPhotoUpdateInput";

@ArgsType()
class UpdateProviderPhotoArgs {
  @Field(() => ProviderPhotoWhereUniqueInput, { nullable: false })
  where!: ProviderPhotoWhereUniqueInput;
  @Field(() => ProviderPhotoUpdateInput, { nullable: false })
  data!: ProviderPhotoUpdateInput;
}

export { UpdateProviderPhotoArgs };
