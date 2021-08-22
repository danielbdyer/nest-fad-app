import { ArgsType, Field } from "@nestjs/graphql";
import { SpecialtyWhereUniqueInput } from "./SpecialtyWhereUniqueInput";

@ArgsType()
class SpecialtyFindUniqueArgs {
  @Field(() => SpecialtyWhereUniqueInput, { nullable: false })
  where!: SpecialtyWhereUniqueInput;
}

export { SpecialtyFindUniqueArgs };
