import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { InsuranceCarrierWhereUniqueInput } from "../../insuranceCarrier/base/InsuranceCarrierWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
@InputType()
class InsurancePlanWhereInput {
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
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  code?: StringNullableFilter;

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
}
export { InsurancePlanWhereInput };
