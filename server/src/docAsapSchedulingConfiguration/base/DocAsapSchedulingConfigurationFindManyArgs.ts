import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DocAsapSchedulingConfigurationWhereInput } from "./DocAsapSchedulingConfigurationWhereInput";
import { Type } from "class-transformer";
import { DocAsapSchedulingConfigurationOrderByInput } from "./DocAsapSchedulingConfigurationOrderByInput";

@ArgsType()
class DocAsapSchedulingConfigurationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => DocAsapSchedulingConfigurationWhereInput,
  })
  @Field(() => DocAsapSchedulingConfigurationWhereInput, { nullable: true })
  @Type(() => DocAsapSchedulingConfigurationWhereInput)
  where?: DocAsapSchedulingConfigurationWhereInput;

  @ApiProperty({
    required: false,
    type: DocAsapSchedulingConfigurationOrderByInput,
  })
  @Field(() => DocAsapSchedulingConfigurationOrderByInput, { nullable: true })
  @Type(() => DocAsapSchedulingConfigurationOrderByInput)
  orderBy?: DocAsapSchedulingConfigurationOrderByInput;

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

export { DocAsapSchedulingConfigurationFindManyArgs };
