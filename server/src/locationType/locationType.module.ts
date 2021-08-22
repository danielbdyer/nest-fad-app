import { Module } from "@nestjs/common";
import { LocationTypeModuleBase } from "./base/locationType.module.base";
import { LocationTypeService } from "./locationType.service";
import { LocationTypeController } from "./locationType.controller";
import { LocationTypeResolver } from "./locationType.resolver";

@Module({
  imports: [LocationTypeModuleBase],
  controllers: [LocationTypeController],
  providers: [LocationTypeService, LocationTypeResolver],
  exports: [LocationTypeService],
})
export class LocationTypeModule {}
