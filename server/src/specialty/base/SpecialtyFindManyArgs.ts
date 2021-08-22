import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SpecialtyWhereInput } from "./SpecialtyWhereInput";
import { Type } from "class-transformer";
import { SpecialtyOrderByInput } from "./SpecialtyOrderByInput";

@ArgsType()
class SpecialtyFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SpecialtyWhereInput,
  })
  @Field(() => SpecialtyWhereInput, { nullable: true })
  @Type(() => SpecialtyWhereInput)
  where?: SpecialtyWhereInput;

  @ApiProperty({
    required: false,
    type: SpecialtyOrderByInput,
  })
  @Field(() => SpecialtyOrderByInput, { nullable: true })
  @Type(() => SpecialtyOrderByInput)
  orderBy?: SpecialtyOrderByInput;

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

export { SpecialtyFindManyArgs };
