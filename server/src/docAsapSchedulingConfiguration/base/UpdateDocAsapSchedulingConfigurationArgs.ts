import { ArgsType, Field } from "@nestjs/graphql";
import { DocAsapSchedulingConfigurationWhereUniqueInput } from "./DocAsapSchedulingConfigurationWhereUniqueInput";
import { DocAsapSchedulingConfigurationUpdateInput } from "./DocAsapSchedulingConfigurationUpdateInput";

@ArgsType()
class UpdateDocAsapSchedulingConfigurationArgs {
  @Field(() => DocAsapSchedulingConfigurationWhereUniqueInput, {
    nullable: false,
  })
  where!: DocAsapSchedulingConfigurationWhereUniqueInput;
  @Field(() => DocAsapSchedulingConfigurationUpdateInput, { nullable: false })
  data!: DocAsapSchedulingConfigurationUpdateInput;
}

export { UpdateDocAsapSchedulingConfigurationArgs };
