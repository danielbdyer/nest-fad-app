import { ArgsType, Field } from "@nestjs/graphql";
import { MedicalGroupWhereUniqueInput } from "./MedicalGroupWhereUniqueInput";

@ArgsType()
class MedicalGroupFindUniqueArgs {
  @Field(() => MedicalGroupWhereUniqueInput, { nullable: false })
  where!: MedicalGroupWhereUniqueInput;
}

export { MedicalGroupFindUniqueArgs };
