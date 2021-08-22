import { ArgsType, Field } from "@nestjs/graphql";
import { InsurancePlanWhereUniqueInput } from "./InsurancePlanWhereUniqueInput";

@ArgsType()
class DeleteInsurancePlanArgs {
  @Field(() => InsurancePlanWhereUniqueInput, { nullable: false })
  where!: InsurancePlanWhereUniqueInput;
}

export { DeleteInsurancePlanArgs };
