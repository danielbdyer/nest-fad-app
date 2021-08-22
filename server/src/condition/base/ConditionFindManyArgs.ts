import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ConditionWhereInput } from "./ConditionWhereInput";
import { Type } from "class-transformer";
import { ConditionOrderByInput } from "./ConditionOrderByInput";

@ArgsType()
class ConditionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ConditionWhereInput,
  })
  @Field(() => ConditionWhereInput, { nullable: true })
  @Type(() => ConditionWhereInput)
  where?: ConditionWhereInput;

  @ApiProperty({
    required: false,
    type: ConditionOrderByInput,
  })
  @Field(() => ConditionOrderByInput, { nullable: true })
  @Type(() => ConditionOrderByInput)
  orderBy?: ConditionOrderByInput;

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

export { ConditionFindManyArgs };
