import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ServiceLineWhereInput } from "./ServiceLineWhereInput";
import { Type } from "class-transformer";
import { ServiceLineOrderByInput } from "./ServiceLineOrderByInput";

@ArgsType()
class ServiceLineFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ServiceLineWhereInput,
  })
  @Field(() => ServiceLineWhereInput, { nullable: true })
  @Type(() => ServiceLineWhereInput)
  where?: ServiceLineWhereInput;

  @ApiProperty({
    required: false,
    type: ServiceLineOrderByInput,
  })
  @Field(() => ServiceLineOrderByInput, { nullable: true })
  @Type(() => ServiceLineOrderByInput)
  orderBy?: ServiceLineOrderByInput;

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

export { ServiceLineFindManyArgs };
