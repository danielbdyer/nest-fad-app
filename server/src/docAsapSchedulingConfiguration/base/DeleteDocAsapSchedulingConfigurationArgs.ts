import { ArgsType, Field } from "@nestjs/graphql";
import { DocAsapSchedulingConfigurationWhereUniqueInput } from "./DocAsapSchedulingConfigurationWhereUniqueInput";

@ArgsType()
class DeleteDocAsapSchedulingConfigurationArgs {
  @Field(() => DocAsapSchedulingConfigurationWhereUniqueInput, {
    nullable: false,
  })
  where!: DocAsapSchedulingConfigurationWhereUniqueInput;
}

export { DeleteDocAsapSchedulingConfigurationArgs };
