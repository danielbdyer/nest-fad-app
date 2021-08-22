import { ArgsType, Field } from "@nestjs/graphql";
import { InsurancePlanWhereUniqueInput } from "./InsurancePlanWhereUniqueInput";
import { InsurancePlanUpdateInput } from "./InsurancePlanUpdateInput";

@ArgsType()
class UpdateInsurancePlanArgs {
  @Field(() => InsurancePlanWhereUniqueInput, { nullable: false })
  where!: InsurancePlanWhereUniqueInput;
  @Field(() => InsurancePlanUpdateInput, { nullable: false })
  data!: InsurancePlanUpdateInput;
}

export { UpdateInsurancePlanArgs };
