import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";
import { SpecialtyWhereUniqueInput } from "../../specialty/base/SpecialtyWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class ConditionCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: true,
    type: () => SpecialtyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SpecialtyWhereUniqueInput)
  @Field(() => SpecialtyWhereUniqueInput)
  specialty!: SpecialtyWhereUniqueInput;
}
export { ConditionCreateInput };
