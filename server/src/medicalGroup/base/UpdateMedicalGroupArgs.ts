import { ArgsType, Field } from "@nestjs/graphql";
import { MedicalGroupWhereUniqueInput } from "./MedicalGroupWhereUniqueInput";
import { MedicalGroupUpdateInput } from "./MedicalGroupUpdateInput";

@ArgsType()
class UpdateMedicalGroupArgs {
  @Field(() => MedicalGroupWhereUniqueInput, { nullable: false })
  where!: MedicalGroupWhereUniqueInput;
  @Field(() => MedicalGroupUpdateInput, { nullable: false })
  data!: MedicalGroupUpdateInput;
}

export { UpdateMedicalGroupArgs };
