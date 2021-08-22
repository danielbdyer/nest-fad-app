import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderTypeCreateInput } from "./ProviderTypeCreateInput";

@ArgsType()
class CreateProviderTypeArgs {
  @Field(() => ProviderTypeCreateInput, { nullable: false })
  data!: ProviderTypeCreateInput;
}

export { CreateProviderTypeArgs };
