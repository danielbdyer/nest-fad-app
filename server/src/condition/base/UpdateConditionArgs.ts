import { ArgsType, Field } from "@nestjs/graphql";
import { ConditionWhereUniqueInput } from "./ConditionWhereUniqueInput";
import { ConditionUpdateInput } from "./ConditionUpdateInput";

@ArgsType()
class UpdateConditionArgs {
  @Field(() => ConditionWhereUniqueInput, { nullable: false })
  where!: ConditionWhereUniqueInput;
  @Field(() => ConditionUpdateInput, { nullable: false })
  data!: ConditionUpdateInput;
}

export { UpdateConditionArgs };
