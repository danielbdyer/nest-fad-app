import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ServiceLineWhereUniqueInput } from "../../serviceLine/base/ServiceLineWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class SpecialtyCreateInput {
  @ApiProperty({
    required: false,
    type: () => ServiceLineWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ServiceLineWhereUniqueInput)
  @IsOptional()
  @Field(() => ServiceLineWhereUniqueInput, {
    nullable: true,
  })
  serviceLine?: ServiceLineWhereUniqueInput | null;
}
export { SpecialtyCreateInput };
