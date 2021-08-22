import { ArgsType, Field } from "@nestjs/graphql";
import { InsuranceCarrierCreateInput } from "./InsuranceCarrierCreateInput";

@ArgsType()
class CreateInsuranceCarrierArgs {
  @Field(() => InsuranceCarrierCreateInput, { nullable: false })
  data!: InsuranceCarrierCreateInput;
}

export { CreateInsuranceCarrierArgs };
