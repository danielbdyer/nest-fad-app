import { ArgsType, Field } from "@nestjs/graphql";
import { LanguageWhereUniqueInput } from "./LanguageWhereUniqueInput";

@ArgsType()
class LanguageFindUniqueArgs {
  @Field(() => LanguageWhereUniqueInput, { nullable: false })
  where!: LanguageWhereUniqueInput;
}

export { LanguageFindUniqueArgs };
