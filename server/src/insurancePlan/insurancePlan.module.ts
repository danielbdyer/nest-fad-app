import { Module } from "@nestjs/common";
import { InsurancePlanModuleBase } from "./base/insurancePlan.module.base";
import { InsurancePlanService } from "./insurancePlan.service";
import { InsurancePlanController } from "./insurancePlan.controller";
import { InsurancePlanResolver } from "./insurancePlan.resolver";

@Module({
  imports: [InsurancePlanModuleBase],
  controllers: [InsurancePlanController],
  providers: [InsurancePlanService, InsurancePlanResolver],
  exports: [InsurancePlanService],
})
export class InsurancePlanModule {}
