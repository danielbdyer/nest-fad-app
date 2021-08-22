import { ArgsType, Field } from "@nestjs/graphql";
import { LocationTypeWhereUniqueInput } from "./LocationTypeWhereUniqueInput";
import { LocationTypeUpdateInput } from "./LocationTypeUpdateInput";

@ArgsType()
class UpdateLocationTypeArgs {
  @Field(() => LocationTypeWhereUniqueInput, { nullable: false })
  where!: LocationTypeWhereUniqueInput;
  @Field(() => LocationTypeUpdateInput, { nullable: false })
  data!: LocationTypeUpdateInput;
}

export { UpdateLocationTypeArgs };
