import { Module } from "@nestjs/common";
import { DocAsapSchedulingConfigurationModuleBase } from "./base/docAsapSchedulingConfiguration.module.base";
import { DocAsapSchedulingConfigurationService } from "./docAsapSchedulingConfiguration.service";
import { DocAsapSchedulingConfigurationController } from "./docAsapSchedulingConfiguration.controller";
import { DocAsapSchedulingConfigurationResolver } from "./docAsapSchedulingConfiguration.resolver";

@Module({
  imports: [DocAsapSchedulingConfigurationModuleBase],
  controllers: [DocAsapSchedulingConfigurationController],
  providers: [
    DocAsapSchedulingConfigurationService,
    DocAsapSchedulingConfigurationResolver,
  ],
  exports: [DocAsapSchedulingConfigurationService],
})
export class DocAsapSchedulingConfigurationModule {}
