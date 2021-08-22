import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { InsurancePlan } from "../../insurancePlan/base/InsurancePlan";
import { Provider } from "../../provider/base/Provider";
@ObjectType()
class InsuranceCarrier {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  code!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: true,
    type: () => [InsurancePlan],
  })
  @ValidateNested()
  @Type(() => InsurancePlan)
  @IsOptional()
  insurancePlans?: Array<InsurancePlan>;

  @ApiProperty({
    required: true,
    type: () => [Provider],
  })
  @ValidateNested()
  @Type(() => Provider)
  @IsOptional()
  provider?: Array<Provider>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { InsuranceCarrier };
