import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { ServiceLineWhereUniqueInput } from "../../serviceLine/base/ServiceLineWhereUniqueInput";
@InputType()
class SpecialtyWhereInput {
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
    type: () => ServiceLineWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ServiceLineWhereUniqueInput)
  @IsOptional()
  @Field(() => ServiceLineWhereUniqueInput, {
    nullable: true,
  })
  serviceLine?: ServiceLineWhereUniqueInput;
}
export { SpecialtyWhereInput };
