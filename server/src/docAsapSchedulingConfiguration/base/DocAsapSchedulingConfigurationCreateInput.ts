import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateNested } from "class-validator";
import { ProviderWhereUniqueInput } from "../../provider/base/ProviderWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class DocAsapSchedulingConfigurationCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  docAsapId!: string;

  @ApiProperty({
    required: true,
    type: () => ProviderWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ProviderWhereUniqueInput)
  @Field(() => ProviderWhereUniqueInput)
  provider!: ProviderWhereUniqueInput;
}
export { DocAsapSchedulingConfigurationCreateInput };
