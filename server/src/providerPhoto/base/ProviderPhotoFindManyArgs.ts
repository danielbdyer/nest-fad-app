import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ProviderPhotoWhereInput } from "./ProviderPhotoWhereInput";
import { Type } from "class-transformer";
import { ProviderPhotoOrderByInput } from "./ProviderPhotoOrderByInput";

@ArgsType()
class ProviderPhotoFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ProviderPhotoWhereInput,
  })
  @Field(() => ProviderPhotoWhereInput, { nullable: true })
  @Type(() => ProviderPhotoWhereInput)
  where?: ProviderPhotoWhereInput;

  @ApiProperty({
    required: false,
    type: ProviderPhotoOrderByInput,
  })
  @Field(() => ProviderPhotoOrderByInput, { nullable: true })
  @Type(() => ProviderPhotoOrderByInput)
  orderBy?: ProviderPhotoOrderByInput;

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

export { ProviderPhotoFindManyArgs };
