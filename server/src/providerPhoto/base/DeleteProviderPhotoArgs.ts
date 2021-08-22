import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderPhotoWhereUniqueInput } from "./ProviderPhotoWhereUniqueInput";

@ArgsType()
class DeleteProviderPhotoArgs {
  @Field(() => ProviderPhotoWhereUniqueInput, { nullable: false })
  where!: ProviderPhotoWhereUniqueInput;
}

export { DeleteProviderPhotoArgs };
