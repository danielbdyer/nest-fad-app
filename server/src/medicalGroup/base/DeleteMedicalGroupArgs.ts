import { ArgsType, Field } from "@nestjs/graphql";
import { MedicalGroupWhereUniqueInput } from "./MedicalGroupWhereUniqueInput";

@ArgsType()
class DeleteMedicalGroupArgs {
  @Field(() => MedicalGroupWhereUniqueInput, { nullable: false })
  where!: MedicalGroupWhereUniqueInput;
}

export { DeleteMedicalGroupArgs };
