import { Module } from "@nestjs/common";
import { InsuranceCarrierModuleBase } from "./base/insuranceCarrier.module.base";
import { InsuranceCarrierService } from "./insuranceCarrier.service";
import { InsuranceCarrierController } from "./insuranceCarrier.controller";
import { InsuranceCarrierResolver } from "./insuranceCarrier.resolver";

@Module({
  imports: [InsuranceCarrierModuleBase],
  controllers: [InsuranceCarrierController],
  providers: [InsuranceCarrierService, InsuranceCarrierResolver],
  exports: [InsuranceCarrierService],
})
export class InsuranceCarrierModule {}
