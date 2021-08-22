import { Module } from "@nestjs/common";
import { ServiceLineModuleBase } from "./base/serviceLine.module.base";
import { ServiceLineService } from "./serviceLine.service";
import { ServiceLineController } from "./serviceLine.controller";
import { ServiceLineResolver } from "./serviceLine.resolver";

@Module({
  imports: [ServiceLineModuleBase],
  controllers: [ServiceLineController],
  providers: [ServiceLineService, ServiceLineResolver],
  exports: [ServiceLineService],
})
export class ServiceLineModule {}
