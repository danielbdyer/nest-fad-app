import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Condition } from "../../condition/base/Condition";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Provider } from "../../provider/base/Provider";
import { ServiceLine } from "../../serviceLine/base/ServiceLine";
@ObjectType()
class Specialty {
  @ApiProperty({
    required: false,
    type: () => [Condition],
  })
  @ValidateNested()
  @Type(() => Condition)
  @IsOptional()
  conditions?: Array<Condition>;

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
    type: () => [Provider],
  })
  @ValidateNested()
  @Type(() => Provider)
  @IsOptional()
  providers?: Array<Provider>;

  @ApiProperty({
    required: false,
    type: () => ServiceLine,
  })
  @ValidateNested()
  @Type(() => ServiceLine)
  @IsOptional()
  serviceLine?: ServiceLine | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Specialty };
