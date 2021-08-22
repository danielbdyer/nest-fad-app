import { ArgsType, Field } from "@nestjs/graphql";
import { SpecialtyCreateInput } from "./SpecialtyCreateInput";

@ArgsType()
class CreateSpecialtyArgs {
  @Field(() => SpecialtyCreateInput, { nullable: false })
  data!: SpecialtyCreateInput;
}

export { CreateSpecialtyArgs };
