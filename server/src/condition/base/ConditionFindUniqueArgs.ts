import { ArgsType, Field } from "@nestjs/graphql";
import { ConditionWhereUniqueInput } from "./ConditionWhereUniqueInput";

@ArgsType()
class ConditionFindUniqueArgs {
  @Field(() => ConditionWhereUniqueInput, { nullable: false })
  where!: ConditionWhereUniqueInput;
}

export { ConditionFindUniqueArgs };
