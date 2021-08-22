import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SortOrder } from "../../util/SortOrder";

@InputType({
  isAbstract: true,
  description: undefined,
})
class LocationOrderByInput {
  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  addressLine_1?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  addressLine_2?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  city?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  createdAt?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  friday?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  id?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  locationTypeId?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  monday?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  saturday?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  state?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  sunday?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  thursday?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  tuesday?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  updatedAt?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  wednesday?: SortOrder;

  @ApiProperty({
    required: false,
    enum: ["Asc", "Desc"],
  })
  @Field(() => SortOrder, {
    nullable: true,
  })
  zip?: SortOrder;
}

export { LocationOrderByInput };
