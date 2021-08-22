import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Location } from "../../location/base/Location";
import { Specialty } from "../../specialty/base/Specialty";
@ObjectType()
class ServiceLine {
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
    type: () => [Location],
  })
  @ValidateNested()
  @Type(() => Location)
  @IsOptional()
  locations?: Array<Location>;

  @ApiProperty({
    required: false,
    type: () => [Specialty],
  })
  @ValidateNested()
  @Type(() => Specialty)
  @IsOptional()
  specialties?: Array<Specialty>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { ServiceLine };
