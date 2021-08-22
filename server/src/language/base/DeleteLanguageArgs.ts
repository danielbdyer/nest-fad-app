import { ArgsType, Field } from "@nestjs/graphql";
import { LanguageWhereUniqueInput } from "./LanguageWhereUniqueInput";

@ArgsType()
class DeleteLanguageArgs {
  @Field(() => LanguageWhereUniqueInput, { nullable: false })
  where!: LanguageWhereUniqueInput;
}

export { DeleteLanguageArgs };
