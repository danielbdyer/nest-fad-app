import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderTypeWhereUniqueInput } from "./ProviderTypeWhereUniqueInput";

@ArgsType()
class DeleteProviderTypeArgs {
  @Field(() => ProviderTypeWhereUniqueInput, { nullable: false })
  where!: ProviderTypeWhereUniqueInput;
}

export { DeleteProviderTypeArgs };
