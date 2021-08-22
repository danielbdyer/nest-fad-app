import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { SpecialtyWhereUniqueInput } from "../../specialty/base/SpecialtyWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class ConditionUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;

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
export { ConditionUpdateInput };
