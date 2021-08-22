import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsString,
  IsOptional,
  ValidateNested,
  IsInt,
  IsEnum,
} from "class-validator";
import { DocAsapSchedulingConfigurationWhereUniqueInput } from "../../docAsapSchedulingConfiguration/base/DocAsapSchedulingConfigurationWhereUniqueInput";
import { Type } from "class-transformer";
import { EnumProviderGender } from "./EnumProviderGender";
import { ProviderPhotoWhereUniqueInput } from "../../providerPhoto/base/ProviderPhotoWhereUniqueInput";
@InputType()
class ProviderCreateInput {
  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  @Field(() => Boolean)
  acceptingNewPatients!: boolean;

  @ApiProperty({
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  @Field(() => Boolean)
  active!: boolean;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  biography?: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  chatAvailable?: boolean | null;

  @ApiProperty({
    required: true,
    type: () => DocAsapSchedulingConfigurationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DocAsapSchedulingConfigurationWhereUniqueInput)
  @Field(() => DocAsapSchedulingConfigurationWhereUniqueInput)
  docAsapSchedulingConfiguration!: DocAsapSchedulingConfigurationWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  employed?: boolean | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  epicReference?: number | null;

  @ApiProperty({
    required: false,
    enum: EnumProviderGender,
  })
  @IsEnum(EnumProviderGender)
  @IsOptional()
  @Field(() => EnumProviderGender, {
    nullable: true,
  })
  gender?: "M" | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  onlineAppointments?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => ProviderPhotoWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ProviderPhotoWhereUniqueInput)
  @IsOptional()
  @Field(() => ProviderPhotoWhereUniqueInput, {
    nullable: true,
  })
  providerPhotos?: ProviderPhotoWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  videoUrl?: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  virtualVisits?: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  website?: string | null;
}
export { ProviderCreateInput };
