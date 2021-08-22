import { ArgsType, Field } from "@nestjs/graphql";
import { MedicalGroupCreateInput } from "./MedicalGroupCreateInput";

@ArgsType()
class CreateMedicalGroupArgs {
  @Field(() => MedicalGroupCreateInput, { nullable: false })
  data!: MedicalGroupCreateInput;
}

export { CreateMedicalGroupArgs };
