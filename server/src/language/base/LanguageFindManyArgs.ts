import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LanguageWhereInput } from "./LanguageWhereInput";
import { Type } from "class-transformer";
import { LanguageOrderByInput } from "./LanguageOrderByInput";

@ArgsType()
class LanguageFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => LanguageWhereInput,
  })
  @Field(() => LanguageWhereInput, { nullable: true })
  @Type(() => LanguageWhereInput)
  where?: LanguageWhereInput;

  @ApiProperty({
    required: false,
    type: LanguageOrderByInput,
  })
  @Field(() => LanguageOrderByInput, { nullable: true })
  @Type(() => LanguageOrderByInput)
  orderBy?: LanguageOrderByInput;

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

export { LanguageFindManyArgs };
