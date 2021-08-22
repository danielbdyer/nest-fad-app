import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderPhotoWhereUniqueInput } from "./ProviderPhotoWhereUniqueInput";

@ArgsType()
class ProviderPhotoFindUniqueArgs {
  @Field(() => ProviderPhotoWhereUniqueInput, { nullable: false })
  where!: ProviderPhotoWhereUniqueInput;
}

export { ProviderPhotoFindUniqueArgs };
