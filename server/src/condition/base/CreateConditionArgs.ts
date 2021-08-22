import { ArgsType, Field } from "@nestjs/graphql";
import { ConditionCreateInput } from "./ConditionCreateInput";

@ArgsType()
class CreateConditionArgs {
  @Field(() => ConditionCreateInput, { nullable: false })
  data!: ConditionCreateInput;
}

export { CreateConditionArgs };
