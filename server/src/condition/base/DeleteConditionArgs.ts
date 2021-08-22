import { ArgsType, Field } from "@nestjs/graphql";
import { ConditionWhereUniqueInput } from "./ConditionWhereUniqueInput";

@ArgsType()
class DeleteConditionArgs {
  @Field(() => ConditionWhereUniqueInput, { nullable: false })
  where!: ConditionWhereUniqueInput;
}

export { DeleteConditionArgs };
