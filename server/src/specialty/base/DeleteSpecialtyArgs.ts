import { ArgsType, Field } from "@nestjs/graphql";
import { SpecialtyWhereUniqueInput } from "./SpecialtyWhereUniqueInput";

@ArgsType()
class DeleteSpecialtyArgs {
  @Field(() => SpecialtyWhereUniqueInput, { nullable: false })
  where!: SpecialtyWhereUniqueInput;
}

export { DeleteSpecialtyArgs };
