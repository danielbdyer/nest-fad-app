import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { SpecialtyWhereUniqueInput } from "../../specialty/base/SpecialtyWhereUniqueInput";
@InputType()
class ConditionWhereInput {
  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  name?: StringFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => SpecialtyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SpecialtyWhereUniqueInput)
  @IsOptional()
  @Field(() => SpecialtyWhereUniqueInput, {
    nullable: true,
  })
  specialty?: SpecialtyWhereUniqueInput;
}
export { ConditionWhereInput };
