import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { InsurancePlanWhereInput } from "./InsurancePlanWhereInput";
import { Type } from "class-transformer";
import { InsurancePlanOrderByInput } from "./InsurancePlanOrderByInput";

@ArgsType()
class InsurancePlanFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => InsurancePlanWhereInput,
  })
  @Field(() => InsurancePlanWhereInput, { nullable: true })
  @Type(() => InsurancePlanWhereInput)
  where?: InsurancePlanWhereInput;

  @ApiProperty({
    required: false,
    type: InsurancePlanOrderByInput,
  })
  @Field(() => InsurancePlanOrderByInput, { nullable: true })
  @Type(() => InsurancePlanOrderByInput)
  orderBy?: InsurancePlanOrderByInput;

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

export { InsurancePlanFindManyArgs };
