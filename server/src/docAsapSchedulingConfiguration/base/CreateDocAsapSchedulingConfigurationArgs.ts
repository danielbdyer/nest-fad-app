import { ArgsType, Field } from "@nestjs/graphql";
import { DocAsapSchedulingConfigurationCreateInput } from "./DocAsapSchedulingConfigurationCreateInput";

@ArgsType()
class CreateDocAsapSchedulingConfigurationArgs {
  @Field(() => DocAsapSchedulingConfigurationCreateInput, { nullable: false })
  data!: DocAsapSchedulingConfigurationCreateInput;
}

export { CreateDocAsapSchedulingConfigurationArgs };
