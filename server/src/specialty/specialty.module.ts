import { Module } from "@nestjs/common";
import { SpecialtyModuleBase } from "./base/specialty.module.base";
import { SpecialtyService } from "./specialty.service";
import { SpecialtyController } from "./specialty.controller";
import { SpecialtyResolver } from "./specialty.resolver";

@Module({
  imports: [SpecialtyModuleBase],
  controllers: [SpecialtyController],
  providers: [SpecialtyService, SpecialtyResolver],
  exports: [SpecialtyService],
})
export class SpecialtyModule {}
