import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ProviderTypeWhereInput } from "./ProviderTypeWhereInput";
import { Type } from "class-transformer";
import { ProviderTypeOrderByInput } from "./ProviderTypeOrderByInput";

@ArgsType()
class ProviderTypeFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ProviderTypeWhereInput,
  })
  @Field(() => ProviderTypeWhereInput, { nullable: true })
  @Type(() => ProviderTypeWhereInput)
  where?: ProviderTypeWhereInput;

  @ApiProperty({
    required: false,
    type: ProviderTypeOrderByInput,
  })
  @Field(() => ProviderTypeOrderByInput, { nullable: true })
  @Type(() => ProviderTypeOrderByInput)
  orderBy?: ProviderTypeOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ProviderTypeFindManyArgs };
