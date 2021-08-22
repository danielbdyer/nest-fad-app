import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LocationTypeWhereInput } from "./LocationTypeWhereInput";
import { Type } from "class-transformer";
import { LocationTypeOrderByInput } from "./LocationTypeOrderByInput";

@ArgsType()
class LocationTypeFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => LocationTypeWhereInput,
  })
  @Field(() => LocationTypeWhereInput, { nullable: true })
  @Type(() => LocationTypeWhereInput)
  where?: LocationTypeWhereInput;

  @ApiProperty({
    required: false,
    type: LocationTypeOrderByInput,
  })
  @Field(() => LocationTypeOrderByInput, { nullable: true })
  @Type(() => LocationTypeOrderByInput)
  orderBy?: LocationTypeOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { LocationTypeFindManyArgs };
