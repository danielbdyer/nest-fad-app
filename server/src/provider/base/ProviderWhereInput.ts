import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BooleanFilter } from "../../util/BooleanFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested, IsEnum } from "class-validator";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { DocAsapSchedulingConfigurationWhereUniqueInput } from "../../docAsapSchedulingConfiguration/base/DocAsapSchedulingConfigurationWhereUniqueInput";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { EnumProviderGender } from "./EnumProviderGender";
import { StringFilter } from "../../util/StringFilter";
import { ProviderPhotoWhereUniqueInput } from "../../providerPhoto/base/ProviderPhotoWhereUniqueInput";
@InputType()
class ProviderWhereInput {
  @ApiProperty({
    required: false,
    type: BooleanFilter,
  })
  @Type(() => BooleanFilter)
  @IsOptional()
  @Field(() => BooleanFilter, {
    nullable: true,
  })
  acceptingNewPatients?: BooleanFilter;

  @ApiProperty({
    required: false,
    type: BooleanFilter,
  })
  @Type(() => BooleanFilter)
  @IsOptional()
  @Field(() => BooleanFilter, {
    nullable: true,
  })
  active?: BooleanFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  biography?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: BooleanNullableFilter,
  })
  @Type(() => BooleanNullableFilter)
  @IsOptional()
  @Field(() => BooleanNullableFilter, {
    nullable: true,
  })
  chatAvailable?: BooleanNullableFilter;

  @ApiProperty({
    required: false,
    type: () => DocAsapSchedulingConfigurationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => DocAsapSchedulingConfigurationWhereUniqueInput)
  @IsOptional()
  @Field(() => DocAsapSchedulingConfigurationWhereUniqueInput, {
    nullable: true,
  })
  docAsapSchedulingConfiguration?: DocAsapSchedulingConfigurationWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  email?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: BooleanNullableFilter,
  })
  @Type(() => BooleanNullableFilter)
  @IsOptional()
  @Field(() => BooleanNullableFilter, {
    nullable: true,
  })
  employed?: BooleanNullableFilter;

  @ApiProperty({
    required: false,
    type: IntNullableFilter,
  })
  @Type(() => IntNullableFilter)
  @IsOptional()
  @Field(() => IntNullableFilter, {
    nullable: true,
  })
  epicReference?: IntNullableFilter;

  @ApiProperty({
    required: false,
    enum: EnumProviderGender,
  })
  @IsEnum(EnumProviderGender)
  @IsOptional()
  @Field(() => EnumProviderGender, {
    nullable: true,
  })
  gender?: "M";

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
    type: BooleanNullableFilter,
  })
  @Type(() => BooleanNullableFilter)
  @IsOptional()
  @Field(() => BooleanNullableFilter, {
    nullable: true,
  })
  onlineAppointments?: BooleanNullableFilter;

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
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  videoUrl?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: BooleanNullableFilter,
  })
  @Type(() => BooleanNullableFilter)
  @IsOptional()
  @Field(() => BooleanNullableFilter, {
    nullable: true,
  })
  virtualVisits?: BooleanNullableFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  website?: StringNullableFilter;
}
export { ProviderWhereInput };
