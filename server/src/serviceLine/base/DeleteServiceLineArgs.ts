import { ArgsType, Field } from "@nestjs/graphql";
import { ServiceLineWhereUniqueInput } from "./ServiceLineWhereUniqueInput";

@ArgsType()
class DeleteServiceLineArgs {
  @Field(() => ServiceLineWhereUniqueInput, { nullable: false })
  where!: ServiceLineWhereUniqueInput;
}

export { DeleteServiceLineArgs };
