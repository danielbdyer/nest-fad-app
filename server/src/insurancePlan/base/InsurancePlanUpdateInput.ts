import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { InsuranceCarrierWhereUniqueInput } from "../../insuranceCarrier/base/InsuranceCarrierWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class InsurancePlanUpdateInput {
  @ApiProperty({
    required: false,
    type: () => InsuranceCarrierWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => InsuranceCarrierWhereUniqueInput)
  @IsOptional()
  @Field(() => InsuranceCarrierWhereUniqueInput, {
    nullable: true,
  })
  insuranceCarrier?: InsuranceCarrierWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  code?: string | null;

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
}
export { InsurancePlanUpdateInput };
