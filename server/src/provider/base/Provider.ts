import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsString,
  IsOptional,
  ValidateNested,
  IsDate,
  IsInt,
  IsEnum,
} from "class-validator";
import { Condition } from "../../condition/base/Condition";
import { Type } from "class-transformer";
import { DocAsapSchedulingConfiguration } from "../../docAsapSchedulingConfiguration/base/DocAsapSchedulingConfiguration";
import { EnumProviderGender } from "./EnumProviderGender";
import { InsuranceCarrier } from "../../insuranceCarrier/base/InsuranceCarrier";
import { InsurancePlan } from "../../insurancePlan/base/InsurancePlan";
import { Language } from "../../language/base/Language";
import { Location } from "../../location/base/Location";
import { MedicalGroup } from "../../medicalGroup/base/MedicalGroup";
import { ProviderPhoto } from "../../providerPhoto/base/ProviderPhoto";
import { ProviderType } from "../../providerType/base/ProviderType";
import { Specialty } from "../../specialty/base/Specialty";
@ObjectType()
class Provider {
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
  biography!: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  chatAvailable!: boolean | null;

  @ApiProperty({
    required: false,
    type: () => [Condition],
  })
  @ValidateNested()
  @Type(() => Condition)
  @IsOptional()
  conditions?: Array<Condition>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: () => DocAsapSchedulingConfiguration,
  })
  @ValidateNested()
  @Type(() => DocAsapSchedulingConfiguration)
  docAsapSchedulingConfiguration?: DocAsapSchedulingConfiguration;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email!: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  employed!: boolean | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  epicReference!: number | null;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => [InsuranceCarrier],
  })
  @ValidateNested()
  @Type(() => InsuranceCarrier)
  @IsOptional()
  insuranceCarriers?: Array<InsuranceCarrier>;

  @ApiProperty({
    required: false,
    type: () => [InsurancePlan],
  })
  @ValidateNested()
  @Type(() => InsurancePlan)
  @IsOptional()
  insurancePlans?: Array<InsurancePlan>;

  @ApiProperty({
    required: false,
    type: () => [Language],
  })
  @ValidateNested()
  @Type(() => Language)
  @IsOptional()
  languages?: Array<Language>;

  @ApiProperty({
    required: false,
    type: () => [Location],
  })
  @ValidateNested()
  @Type(() => Location)
  @IsOptional()
  locations?: Array<Location>;

  @ApiProperty({
    required: false,
    type: () => [MedicalGroup],
  })
  @ValidateNested()
  @Type(() => MedicalGroup)
  @IsOptional()
  medicalGroups?: Array<MedicalGroup>;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  onlineAppointments!: boolean | null;

  @ApiProperty({
    required: false,
    type: () => ProviderPhoto,
  })
  @ValidateNested()
  @Type(() => ProviderPhoto)
  @IsOptional()
  providerPhotos?: ProviderPhoto;

  @ApiProperty({
    required: false,
    type: () => [ProviderType],
  })
  @ValidateNested()
  @Type(() => ProviderType)
  @IsOptional()
  providerTypes?: Array<ProviderType>;

  @ApiProperty({
    required: true,
    type: () => [Specialty],
  })
  @ValidateNested()
  @Type(() => Specialty)
  @IsOptional()
  specialty?: Array<Specialty>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  videoUrl!: string | null;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  virtualVisits!: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  website!: string | null;
}
export { Provider };
