import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MedicalGroupWhereInput } from "./MedicalGroupWhereInput";
import { Type } from "class-transformer";
import { MedicalGroupOrderByInput } from "./MedicalGroupOrderByInput";

@ArgsType()
class MedicalGroupFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => MedicalGroupWhereInput,
  })
  @Field(() => MedicalGroupWhereInput, { nullable: true })
  @Type(() => MedicalGroupWhereInput)
  where?: MedicalGroupWhereInput;

  @ApiProperty({
    required: false,
    type: MedicalGroupOrderByInput,
  })
  @Field(() => MedicalGroupOrderByInput, { nullable: true })
  @Type(() => MedicalGroupOrderByInput)
  orderBy?: MedicalGroupOrderByInput;

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

export { MedicalGroupFindManyArgs };
