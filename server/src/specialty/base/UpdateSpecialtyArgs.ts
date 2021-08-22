import { ArgsType, Field } from "@nestjs/graphql";
import { SpecialtyWhereUniqueInput } from "./SpecialtyWhereUniqueInput";
import { SpecialtyUpdateInput } from "./SpecialtyUpdateInput";

@ArgsType()
class UpdateSpecialtyArgs {
  @Field(() => SpecialtyWhereUniqueInput, { nullable: false })
  where!: SpecialtyWhereUniqueInput;
  @Field(() => SpecialtyUpdateInput, { nullable: false })
  data!: SpecialtyUpdateInput;
}

export { UpdateSpecialtyArgs };
