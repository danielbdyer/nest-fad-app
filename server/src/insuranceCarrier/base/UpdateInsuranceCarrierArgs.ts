import { ArgsType, Field } from "@nestjs/graphql";
import { InsuranceCarrierWhereUniqueInput } from "./InsuranceCarrierWhereUniqueInput";
import { InsuranceCarrierUpdateInput } from "./InsuranceCarrierUpdateInput";

@ArgsType()
class UpdateInsuranceCarrierArgs {
  @Field(() => InsuranceCarrierWhereUniqueInput, { nullable: false })
  where!: InsuranceCarrierWhereUniqueInput;
  @Field(() => InsuranceCarrierUpdateInput, { nullable: false })
  data!: InsuranceCarrierUpdateInput;
}

export { UpdateInsuranceCarrierArgs };
