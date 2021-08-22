import { Module } from "@nestjs/common";
import { ConditionModuleBase } from "./base/condition.module.base";
import { ConditionService } from "./condition.service";
import { ConditionController } from "./condition.controller";
import { ConditionResolver } from "./condition.resolver";

@Module({
  imports: [ConditionModuleBase],
  controllers: [ConditionController],
  providers: [ConditionService, ConditionResolver],
  exports: [ConditionService],
})
export class ConditionModule {}
