import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { ProviderWhereUniqueInput } from "../../provider/base/ProviderWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class DocAsapSchedulingConfigurationUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  docAsapId?: string;

  @ApiProperty({
    required: false,
    type: () => ProviderWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ProviderWhereUniqueInput)
  @IsOptional()
  @Field(() => ProviderWhereUniqueInput, {
    nullable: true,
  })
  provider?: ProviderWhereUniqueInput;
}
export { DocAsapSchedulingConfigurationUpdateInput };
