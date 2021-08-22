import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { InsuranceCarrierWhereUniqueInput } from "../../insuranceCarrier/base/InsuranceCarrierWhereUniqueInput";
import { ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class InsurancePlanCreateInput {
  @ApiProperty({
    required: true,
    type: () => InsuranceCarrierWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => InsuranceCarrierWhereUniqueInput)
  @Field(() => InsuranceCarrierWhereUniqueInput)
  insuranceCarrier!: InsuranceCarrierWhereUniqueInput;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;
}
export { InsurancePlanCreateInput };
