import { ArgsType, Field } from "@nestjs/graphql";
import { LocationTypeWhereUniqueInput } from "./LocationTypeWhereUniqueInput";

@ArgsType()
class LocationTypeFindUniqueArgs {
  @Field(() => LocationTypeWhereUniqueInput, { nullable: false })
  where!: LocationTypeWhereUniqueInput;
}

export { LocationTypeFindUniqueArgs };
