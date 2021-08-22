import { ArgsType, Field } from "@nestjs/graphql";
import { InsurancePlanWhereUniqueInput } from "./InsurancePlanWhereUniqueInput";

@ArgsType()
class InsurancePlanFindUniqueArgs {
  @Field(() => InsurancePlanWhereUniqueInput, { nullable: false })
  where!: InsurancePlanWhereUniqueInput;
}

export { InsurancePlanFindUniqueArgs };
