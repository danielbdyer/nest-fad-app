import { ArgsType, Field } from "@nestjs/graphql";
import { InsurancePlanCreateInput } from "./InsurancePlanCreateInput";

@ArgsType()
class CreateInsurancePlanArgs {
  @Field(() => InsurancePlanCreateInput, { nullable: false })
  data!: InsurancePlanCreateInput;
}

export { CreateInsurancePlanArgs };
