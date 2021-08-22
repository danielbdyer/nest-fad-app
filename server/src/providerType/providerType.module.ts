import { Module } from "@nestjs/common";
import { ProviderTypeModuleBase } from "./base/providerType.module.base";
import { ProviderTypeService } from "./providerType.service";
import { ProviderTypeController } from "./providerType.controller";
import { ProviderTypeResolver } from "./providerType.resolver";

@Module({
  imports: [ProviderTypeModuleBase],
  controllers: [ProviderTypeController],
  providers: [ProviderTypeService, ProviderTypeResolver],
  exports: [ProviderTypeService],
})
export class ProviderTypeModule {}
