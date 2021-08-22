import { ArgsType, Field } from "@nestjs/graphql";
import { LocationTypeCreateInput } from "./LocationTypeCreateInput";

@ArgsType()
class CreateLocationTypeArgs {
  @Field(() => LocationTypeCreateInput, { nullable: false })
  data!: LocationTypeCreateInput;
}

export { CreateLocationTypeArgs };
