import { ArgsType, Field } from "@nestjs/graphql";
import { DocAsapSchedulingConfigurationWhereUniqueInput } from "./DocAsapSchedulingConfigurationWhereUniqueInput";

@ArgsType()
class DocAsapSchedulingConfigurationFindUniqueArgs {
  @Field(() => DocAsapSchedulingConfigurationWhereUniqueInput, {
    nullable: false,
  })
  where!: DocAsapSchedulingConfigurationWhereUniqueInput;
}

export { DocAsapSchedulingConfigurationFindUniqueArgs };
