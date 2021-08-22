import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderPhotoCreateInput } from "./ProviderPhotoCreateInput";

@ArgsType()
class CreateProviderPhotoArgs {
  @Field(() => ProviderPhotoCreateInput, { nullable: false })
  data!: ProviderPhotoCreateInput;
}

export { CreateProviderPhotoArgs };
