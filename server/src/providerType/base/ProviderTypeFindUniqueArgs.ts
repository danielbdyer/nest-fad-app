import { ArgsType, Field } from "@nestjs/graphql";
import { ProviderTypeWhereUniqueInput } from "./ProviderTypeWhereUniqueInput";

@ArgsType()
class ProviderTypeFindUniqueArgs {
  @Field(() => ProviderTypeWhereUniqueInput, { nullable: false })
  where!: ProviderTypeWhereUniqueInput;
}

export { ProviderTypeFindUniqueArgs };
