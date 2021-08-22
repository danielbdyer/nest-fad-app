import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderTypeWhereUniqueInput } from "./ProviderTypeWhereUniqueInput";
import { ProviderTypeUpdateInput } from "./ProviderTypeUpdateInput";

@ArgsType()
class UpdateProviderTypeArgs {
  @Field(() => ProviderTypeWhereUniqueInput, { nullable: false })
  where!: ProviderTypeWhereUniqueInput;
  @Field(() => ProviderTypeUpdateInput, { nullable: false })
  data!: ProviderTypeUpdateInput;
}

export { UpdateProviderTypeArgs };
