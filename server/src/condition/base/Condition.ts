import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Provider } from "../../provider/base/Provider";
import { Specialty } from "../../specialty/base/Specialty";
@ObjectType()
class Condition {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

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
    required: false,
    type: () => [Provider],
  })
  @ValidateNested()
  @Type(() => Provider)
  @IsOptional()
  provider?: Array<Provider>;

  @ApiProperty({
    required: true,
    type: () => Specialty,
  })
  @ValidateNested()
  @Type(() => Specialty)
  specialty?: Specialty;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Condition };
