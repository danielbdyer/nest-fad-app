import { ArgsType, Field } from "@nestjs/graphql";
import { LocationTypeWhereUniqueInput } from "./LocationTypeWhereUniqueInput";

@ArgsType()
class DeleteLocationTypeArgs {
  @Field(() => LocationTypeWhereUniqueInput, { nullable: false })
  where!: LocationTypeWhereUniqueInput;
}

export { DeleteLocationTypeArgs };
