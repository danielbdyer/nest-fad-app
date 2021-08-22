import { ArgsType, Field } from "@nestjs/graphql";
import { InsuranceCarrierWhereUniqueInput } from "./InsuranceCarrierWhereUniqueInput";

@ArgsType()
class InsuranceCarrierFindUniqueArgs {
  @Field(() => InsuranceCarrierWhereUniqueInput, { nullable: false })
  where!: InsuranceCarrierWhereUniqueInput;
}

export { InsuranceCarrierFindUniqueArgs };
