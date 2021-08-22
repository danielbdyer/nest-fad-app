import { ArgsType, Field } from "@nestjs/graphql";
import { ServiceLineWhereUniqueInput } from "./ServiceLineWhereUniqueInput";

@ArgsType()
class ServiceLineFindUniqueArgs {
  @Field(() => ServiceLineWhereUniqueInput, { nullable: false })
  where!: ServiceLineWhereUniqueInput;
}

export { ServiceLineFindUniqueArgs };
