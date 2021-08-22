import { ArgsType, Field } from "@nestjs/graphql";
import { InsuranceCarrierWhereUniqueInput } from "./InsuranceCarrierWhereUniqueInput";

@ArgsType()
class DeleteInsuranceCarrierArgs {
  @Field(() => InsuranceCarrierWhereUniqueInput, { nullable: false })
  where!: InsuranceCarrierWhereUniqueInput;
}

export { DeleteInsuranceCarrierArgs };
