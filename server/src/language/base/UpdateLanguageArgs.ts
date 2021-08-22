import { ArgsType, Field } from "@nestjs/graphql";
import { LanguageWhereUniqueInput } from "./LanguageWhereUniqueInput";
import { LanguageUpdateInput } from "./LanguageUpdateInput";

@ArgsType()
class UpdateLanguageArgs {
  @Field(() => LanguageWhereUniqueInput, { nullable: false })
  where!: LanguageWhereUniqueInput;
  @Field(() => LanguageUpdateInput, { nullable: false })
  data!: LanguageUpdateInput;
}

export { UpdateLanguageArgs };
