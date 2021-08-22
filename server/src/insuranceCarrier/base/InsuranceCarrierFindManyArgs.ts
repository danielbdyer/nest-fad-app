import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { InsuranceCarrierWhereInput } from "./InsuranceCarrierWhereInput";
import { Type } from "class-transformer";
import { InsuranceCarrierOrderByInput } from "./InsuranceCarrierOrderByInput";

@ArgsType()
class InsuranceCarrierFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => InsuranceCarrierWhereInput,
  })
  @Field(() => InsuranceCarrierWhereInput, { nullable: true })
  @Type(() => InsuranceCarrierWhereInput)
  where?: InsuranceCarrierWhereInput;

  @ApiProperty({
    required: false,
    type: InsuranceCarrierOrderByInput,
  })
  @Field(() => InsuranceCarrierOrderByInput, { nullable: true })
  @Type(() => InsuranceCarrierOrderByInput)
  orderBy?: InsuranceCarrierOrderByInput;

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

export { InsuranceCarrierFindManyArgs };
