import { ArgsType, Field } from "@nestjs/graphql";
import { LanguageCreateInput } from "./LanguageCreateInput";

@ArgsType()
class CreateLanguageArgs {
  @Field(() => LanguageCreateInput, { nullable: false })
  data!: LanguageCreateInput;
}

export { CreateLanguageArgs };
